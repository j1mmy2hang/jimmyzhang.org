#!/usr/bin/env node
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, '../../content/note');
const CONTENT_ROOT = join(__dirname, '../../content');
const OUT = join(__dirname, '../src/generated/note-index.json');
const OUT_META = join(__dirname, '../src/generated/note-meta.json');

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
    const slug = f.replace(/\.md$/, '');
    const raw = await readFile(join(dir, f), 'utf8');
    const { fm, body } = parseFrontmatter(raw);
    out.push({ type, slug, fm, body });
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
  for (const n of all) {
    put(n.slug, n.type, n.slug);
    if (n.fm.title) put(n.fm.title, n.type, n.slug);
  }
  // Add writing and project slugs — lower priority than notes on collision.
  // RANK for these is undefined → treated as lowest via the `!exType` guard.
  for (const t of SITE_TYPES) {
    for (const n of await readSiteContent(t)) {
      put(n.slug, t, n.slug);
      if (n.fm.title) put(n.fm.title, t, n.slug);
    }
  }

  const atomic = {};
  const book = {};
  const clipping = {};
  for (const n of all) {
    const title = n.fm.title || n.slug;
    if (n.type === 'book') {
      book[n.slug] = {
        title,
        date: n.fm.published || n.fm.created || '',
        author: n.fm.author || '',
        cover: stripWikilink(n.fm.cover || ''),
      };
    } else if (n.type === 'clipping') {
      clipping[n.slug] = {
        title,
        date: n.fm.published || n.fm.created || '',
        source: n.fm.source || '',
        rating: n.fm.rating ? Number(n.fm.rating) : 0,
      };
    } else {
      atomic[n.slug] = { title, date: n.fm.published || n.fm.created || '' };
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

  const out = { atomic, book, clipping, connections, resolve };
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(out));
  // Slim index: just metadata, no connections or resolve map.
  // Used by list/wheel pages that don't need wikilink resolution.
  const slim = { atomic, book, clipping };
  await writeFile(OUT_META, JSON.stringify(slim));
  console.log(
    `[note-index] atomic=${Object.keys(atomic).length} book=${Object.keys(book).length} clipping=${Object.keys(clipping).length}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
