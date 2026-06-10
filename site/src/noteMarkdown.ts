import { marked, stripObsidianDecorations, renderMath, renderCallouts } from './markdown';
import { resolvedUrl, resolveKey } from './noteIndex';
import type { NoteIndex } from './noteIndex';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );
}

function youtubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? m[1] : null;
}

function ytEmbed(id: string): string {
  return (
    `\n\n<div class="yt-embed"><iframe ` +
    `src="https://www.youtube.com/embed/${id}" ` +
    `title="YouTube video" loading="lazy" frameborder="0" ` +
    `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
    `allowfullscreen></iframe></div>\n\n`
  );
}

// Obsidian image wikilinks → images served from /asset/image/.
// A numeric size hint — `![[photo.png|320]]` or `![[photo.png|320x200]]` —
// marks the image `image-small`. CSS then imposes one uniform, flexible
// small width; the exact pixels in the link are intentionally discarded.
// The bare form and non-numeric pipes (e.g. captions) keep full width.
function isWidthHint(size?: string): boolean {
  return !!size && /^\d+(?:x\d+)?$/.test(size.trim());
}

function imageFromWikilink(filename: string, size?: string): string {
  const path = `/asset/image/${filename.trim()}`;
  // Always a markdown image so it tokenizes as an inline image (and gets the
  // same paragraph wrapping as a plain image). A width hint sets the alt to
  // the `image-small` sentinel; markdown.ts's image renderer turns that into
  // the real class. Angle-bracket URL syntax handles filenames with spaces.
  const alt = isWidthHint(size) ? 'image-small' : '';
  return `![${alt}](<${path}>)`;
}

function replaceImageWikilinks(body: string): string {
  // Block form: image alone on its line.
  body = body.replace(
    /^!\[\[([^\]\n|]+)(?:\|([^\]\n]*))?\]\][ \t]*\r?\n?/gm,
    (_m, filename: string, size?: string) => imageFromWikilink(filename, size) + '\n'
  );
  // Inline form: image embedded in surrounding text.
  body = body.replace(
    /!\[\[([^\]\n|]+)(?:\|([^\]\n]*))?\]\]/g,
    (_m, filename: string, size?: string) => imageFromWikilink(filename, size)
  );
  return body;
}

// Strip local image wikilinks; rewrite text wikilinks to markdown links the
// rest of `marked` can consume. Unresolved links fall back to a dim inline
// span so the reader can still see the intended target.
export function preprocessNoteBody(body: string, index: NoteIndex): string {
  body = renderMath(body);
  body = stripObsidianDecorations(body);

  // YouTube — replace `![](url)` and bare-line URL forms with an iframe embed.
  body = body.replace(
    /^!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)[ \t]*$/gm,
    (full, url: string) => {
      const id = youtubeId(url);
      return id ? ytEmbed(id) : full;
    }
  );
  body = body.replace(
    /^(https?:\/\/[^\s]+)[ \t]*$/gm,
    (full, url: string) => {
      const id = youtubeId(url);
      return id ? ytEmbed(id) : full;
    }
  );

  // ![[filename|optional-size]] → rendered image from /asset/image/.
  body = replaceImageWikilinks(body);

  body = body.replace(
    /\[\[([^\]\n]+?)\]\]/g,
    (_m, inner: string) => {
      const [rawTarget, rawAlias] = inner.split('|');
      const target = rawTarget.split('#')[0].trim();
      const alias = rawAlias?.trim();
      const r = resolveKey(index, target);
      if (!r) {
        const label = alias || target;
        return `<span class="wikilink-missing">${escapeHtml(label)}</span>`;
      }
      const label = alias || r.title;
      // Escape square brackets in label so marked doesn't re-parse it.
      const safe = label.replace(/[\[\]]/g, '');
      return `[${safe}](${resolvedUrl(r)})`;
    }
  );

  body = renderCallouts(body);

  return body;
}

export function renderNoteMarkdown(body: string, index: NoteIndex): string {
  return marked.parse(preprocessNoteBody(body, index), { async: false }) as string;
}

// Preprocess wikilinks in non-note pages (writing, project, self, telos):
//   ![[filename|size]] → rendered image from /asset/image/
//   [[target|alias]]   → resolved link via note index (falls back to plain text)
export function preprocessPageBody(body: string, index: NoteIndex): string {
  body = renderMath(body);
  body = stripObsidianDecorations(body);

  // ![[filename|optional-size]] → markdown image with correct asset path.
  body = replaceImageWikilinks(body);

  // [[target|alias]] → note link or plain text if unresolved.
  body = body.replace(
    /\[\[([^\]\n]+?)\]\]/g,
    (_m, inner: string) => {
      const [rawTarget, rawAlias] = inner.split('|');
      const target = rawTarget.split('#')[0].trim();
      const alias = rawAlias?.trim();
      const r = resolveKey(index, target);
      if (!r) return escapeHtml(alias || target);
      const label = alias || r.title;
      const safe = label.replace(/[\[\]]/g, '');
      return `[${safe}](${resolvedUrl(r)})`;
    }
  );

  body = renderCallouts(body);

  return body;
}
