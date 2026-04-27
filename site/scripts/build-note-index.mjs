#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir, unlink, rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, '../../content/note');
const CONTENT_ROOT = join(__dirname, '../../content');
const OUT = join(__dirname, '../src/generated/note-index.json');
const OLD_META = join(__dirname, '../src/generated/note-meta.json');
// Public generated dir lives inside the publicDir (content/) so its files are
// served as plain static JSON at /generated/*.json — no JS bundling, native
// JSON.parse, browser-cached. Anything fetched at runtime goes here; only the
// big resolve+connections graph still ships as a JS chunk (note-index.json).
const PUB_GEN = join(CONTENT_ROOT, 'generated');

const TYPES = ['atomic', 'book', 'clipping'];
const RANK = { atomic: 0, book: 1, clipping: 2 };
// Site content types outside /note — included in resolve table only.
const SITE_TYPES = ['writing', 'project'];

function unquote(s) {
  return s.replace(/^["']|["']$/g, '').trim();
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const fm = {};
  const lines = m[1].split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) { i++; continue; }
    const key = kv[1];
    const val = kv[2];
    if (val === '') {
      const list = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        list.push(unquote(lines[j].replace(/^\s*-\s+/, '')));
        j++;
      }
      if (list.length) {
        fm[key] = list;
        i = j;
        continue;
      }
    }
    fm[key] = unquote(val);
    i++;
  }
  return { fm, body: m[2] };
}

function stripWikilink(s) {
  if (!s) return '';
  const m = s.match(/^\[\[(.+?)\]\]$/);
  return m ? m[1] : s;
}

// Netlify rejects deployed filenames containing `?` or `#`. Obsidian-authored
// notes use both freely (rhetorical questions, anchors), so each build pass
// renames offenders on disk and remembers the original title as a wikilink
// alias. Re-running with already-sanitized files is a no-op.
const FORBID_FS_CHARS = /[?#]/;

async function readNotes(type) {
  const dir = join(CONTENT, type);
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const out = [];
  for (const f of files) {
    if (!f.endsWith('.md') || f === 'index.md') continue;
    let actualFile = f;
    let aliasTitle = null;
    if (FORBID_FS_CHARS.test(f)) {
      const sanitized = f.replace(/[?#]/g, '');
      try {
        await rename(join(dir, f), join(dir, sanitized));
        aliasTitle = f.replace(/\.md$/, '');
        actualFile = sanitized;
        console.log(`[note-index] sanitized: ${type}/${f} → ${sanitized}`);
      } catch (e) {
        throw new Error(`failed to sanitize ${type}/${f}: ${e.message}`);
      }
    }
    const filename = actualFile.replace(/\.md$/, '');
    const raw = await readFile(join(dir, actualFile), 'utf8');
    const { fm, body } = parseFrontmatter(raw);
    // Every note is addressed by its `uid` frontmatter. Filenames are the
    // human-readable titles authored in Obsidian and may change between
    // monthly syncs; the uid is what gives URLs and the connections graph
    // their stability across renames.
    if (!fm.uid) {
      throw new Error(`note missing uid frontmatter: note/${type}/${f}`);
    }
    out.push({ type, slug: fm.uid, file: filename, fm, body, aliasTitle });
  }
  return out;
}

const WIKILINK_RE = /(!?)\[\[([^\]\n]+?)\]\]/g;

function collectOutbound(body) {
  const out = new Set();
  for (const m of body.matchAll(WIKILINK_RE)) {
    if (m[1] === '!') continue;
    const inner = m[2].split('|')[0].split('#')[0].trim();
    if (!inner) continue;
    out.add(inner);
  }
  return out;
}

async function readSiteContent(type) {
  const dir = join(CONTENT_ROOT, type);
  let files;
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const out = [];
  for (const f of files) {
    if (!f.endsWith('.md') || f === 'index.md') continue;
    const slug = f.replace(/\.md$/, '');
    const raw = await readFile(join(dir, f), 'utf8');
    const { fm } = parseFrontmatter(raw);
    out.push({ type, slug, fm });
  }
  return out;
}

async function main() {
  let all = [];
  for (const t of TYPES) all.push(...(await readNotes(t)));

  // Drop books with no cover entirely (per Jimmy's rule).
  all = all.filter((n) => {
    if (n.type !== 'book') return true;
    return Boolean(stripWikilink(n.fm.cover || ''));
  });

  // Resolve table: lowercased slug/title → slug. Priority atomic > book >
  // clipping when keys collide. A parallel `resolveType` map carries the type
  // so callers can locate the target without fattening every entry with it.
  // Resolve values are [type, slug] tuples. Titles are not stored here —
  // callers dereference them via the meta maps (atomic/book/clipping).
  const resolve = {};
  const put = (key, type, slug) => {
    const k = key.toLowerCase().trim();
    if (!k) return;
    const ex = resolve[k];
    if (!ex || RANK[type] < RANK[ex[0]]) resolve[k] = [type, slug];
  };
  // Detect duplicate uids globally across all note types. 4 chars × 62 chars
  // = ~14M space, so a collision among ~2200 notes is almost certainly a
  // copy-paste mistake in the Obsidian source. Fail loudly rather than
  // silently overwrite an entry.
  const seenUid = new Map();
  for (const n of all) {
    const prev = seenUid.get(n.slug);
    if (prev) {
      throw new Error(`duplicate uid "${n.slug}": ${prev.type}/${prev.file} and ${n.type}/${n.file}`);
    }
    seenUid.set(n.slug, n);
  }

  for (const n of all) {
    put(n.slug, n.type, n.slug);
    if (n.fm.title) put(n.fm.title, n.type, n.slug);
    // The filename IS the human-readable title — register it so wikilinks
    // written as `[[Some Title]]` resolve to the uid-keyed entry.
    put(n.file, n.type, n.slug);
    // If the file was renamed to drop forbidden chars (?/#), wikilinks may
    // still reference the original title — register it as an alias.
    if (n.aliasTitle) put(n.aliasTitle, n.type, n.slug);
  }
  // Add writing and project slugs — lower priority than notes on collision.
  // RANK for these is undefined → treated as lowest via the `!exType` guard.
  const writing = {};
  const project = {};
  const siteMeta = { writing, project };
  for (const t of SITE_TYPES) {
    for (const n of await readSiteContent(t)) {
      put(n.slug, t, n.slug);
      if (n.fm.title) put(n.fm.title, t, n.slug);
      siteMeta[t][n.slug] = n.fm.title || n.slug;
    }
  }

  const atomic = {};
  const book = {};
  const clipping = {};
  for (const n of all) {
    // Filename is the canonical title. Frontmatter `title:` (rare, manual
    // override) wins if present. The `file` field carries the on-disk name
    // so the frontend can fetch /note/{type}/{file}.md given a uid.
    const title = n.fm.title || n.file;
    if (n.type === 'book') {
      book[n.slug] = {
        title,
        date: n.fm.published || n.fm.created || '',
        author: n.fm.author || '',
        cover: stripWikilink(n.fm.cover || ''),
        file: n.file,
      };
    } else if (n.type === 'clipping') {
      clipping[n.slug] = {
        title,
        date: n.fm.published || n.fm.created || '',
        source: n.fm.source || '',
        rating: n.fm.rating ? Number(n.fm.rating) : 0,
        file: n.file,
      };
    } else {
      atomic[n.slug] = {
        title,
        date: n.fm.published || n.fm.created || '',
        file: n.file,
      };
    }
  }

  // Connections: an undirected edge map `slug → [slug, ...]`. Every link
  // between two notes — body wikilink or frontmatter `reference:` — gets
  // added to both endpoints. The display side looks up type/title from the
  // meta maps; storing only slugs keeps the graph tiny.
  const connections = {};
  const addConnection = (ownerSlug, otherSlug) => {
    const list = (connections[ownerSlug] ||= []);
    if (!list.includes(otherSlug)) list.push(otherSlug);
  };

  for (const n of all) {
    const keys = new Set();
    for (const t of collectOutbound(n.body)) keys.add(t.toLowerCase());
    const refField = n.fm.reference;
    const refList = Array.isArray(refField) ? refField : refField ? [refField] : [];
    for (const ref of refList) {
      const t = stripWikilink(ref).split('#')[0].trim();
      if (t) keys.add(t.toLowerCase());
    }
    for (const key of keys) {
      const hit = resolve[key];
      if (!hit) continue;
      const [otherType, otherSlug] = hit;
      // Only notes participate in the connection graph (writing/project
      // targets are reachable via wikilinks but don't get a backlink box).
      if (!TYPES.includes(otherType)) continue;
      if (otherSlug === n.slug && otherType === n.type) continue;
      addConnection(n.slug, otherSlug);
      addConnection(otherSlug, n.slug);
    }
  }

  const out = { atomic, book, clipping, writing, project, connections, resolve };
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(out));
  // Older builds emitted a note-meta.json next to note-index.json. It became
  // dead weight once the shelf/wheel pages started fetching their dedicated
  // public meta files; remove it so it doesn't ship as an unused JS chunk.
  await unlink(OLD_META).catch(() => { /* already gone */ });

  // Per-section public JSONs: one fetch, parsed natively by the browser. The
  // shelf/wheel pages each get their own ~tens-of-KB file instead of sharing a
  // 282 KB chunk that pulls in atomic titles they don't use.
  await mkdir(PUB_GEN, { recursive: true });
  await writeFile(join(PUB_GEN, 'book-meta.json'), JSON.stringify(book));
  await writeFile(join(PUB_GEN, 'clipping-meta.json'), JSON.stringify(clipping));

  // List-page indexes: replace `import.meta.glob({ eager: true, query: '?raw' })`
  // bundling, which previously inlined every post body into the main JS bundle.
  const sectionIndexes = {
    writing: ['title', 'published'],
    project: ['title', 'description', 'website', 'image', 'finished', 'status'],
    newsletter: ['title', 'created', 'cover'],
  };
  for (const [type, fields] of Object.entries(sectionIndexes)) {
    const list = [];
    for (const n of await readSiteContent(type)) {
      const entry = { slug: n.slug };
      for (const k of fields) if (n.fm[k] !== undefined) entry[k] = n.fm[k];
      list.push(entry);
    }
    await writeFile(join(PUB_GEN, `${type}-index.json`), JSON.stringify(list));
  }

  // Photo: same pattern but the cover comes from the first body embed
  // (`![[filename]]`), not frontmatter — so we have to read the body too.
  const photoDir = join(CONTENT_ROOT, 'photo');
  let photoFiles = [];
  try { photoFiles = await readdir(photoDir); } catch { /* no photo dir */ }
  const photoList = [];
  for (const f of photoFiles) {
    if (!f.endsWith('.md') || f === 'index.md') continue;
    const slug = f.replace(/\.md$/, '');
    const raw = await readFile(join(photoDir, f), 'utf8');
    const { fm, body } = parseFrontmatter(raw);
    const embed = body.match(/!\[\[([^\]]+)\]\]/);
    photoList.push({
      slug,
      title: fm.title || slug,
      date: fm.date || '',
      location: fm.location || '',
      cover: embed ? embed[1].trim() : null,
    });
  }
  await writeFile(join(PUB_GEN, 'photo-index.json'), JSON.stringify(photoList));

  // Note uid → on-disk-filename rewrites. We let the React route at
  // /note/{type}/{uid} fall through to the SPA (so hard-reloads still serve
  // the app shell), but rewrite /note/{type}/{uid}.md → the human-titled file
  // so both NotePage's fetch and the agent router see real markdown. The
  // block is bounded by markers and re-emitted on every build; everything
  // outside the markers in _redirects is preserved as authored.
  const REDIRECTS_FILE = join(CONTENT_ROOT, '_redirects');
  const MARK_START = '# >>> auto:note-uid (build-note-index.mjs)';
  const MARK_END = '# <<< auto:note-uid';
  const ruleSets = [
    ['atomic', atomic],
    ['book', book],
    ['clipping', clipping],
  ];
  const rules = [];
  for (const [t, meta] of ruleSets) {
    for (const [uid, m] of Object.entries(meta)) {
      const dest = `/note/${t}/${encodeURI(m.file)}.md`;
      rules.push(`/note/${t}/${uid}.md  ${dest}  200`);
    }
  }
  let existing = '';
  try { existing = await readFile(REDIRECTS_FILE, 'utf8'); } catch { /* first run */ }
  // Strip every prior auto-generated block (current note-uid and the legacy
  // book-uid marker emitted by earlier versions). The `/g` flag is essential —
  // earlier versions of this strip lacked it, which is how 35+ stale blocks
  // accumulated in the file. Marker strings are escaped before going into a
  // regex because they contain literal parens.
  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const stripBlock = (text, start, end) =>
    text.replace(new RegExp(`${escapeRe(start)}[\\s\\S]*?${escapeRe(end)}\\n?`, 'g'), '');
  let stripped = stripBlock(existing, MARK_START, MARK_END);
  stripped = stripBlock(stripped, '# >>> auto:book-uid', '# <<< auto:book-uid');
  const block = [MARK_START, ...rules, MARK_END, ''].join('\n');
  await writeFile(REDIRECTS_FILE, block + stripped);

  console.log(
    `[note-index] atomic=${Object.keys(atomic).length} book=${Object.keys(book).length} clipping=${Object.keys(clipping).length}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
