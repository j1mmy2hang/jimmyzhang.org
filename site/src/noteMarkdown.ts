import { marked } from 'marked';
import type { NoteIndex } from './noteIndex';

marked.setOptions({ gfm: true, breaks: true });

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

// Strip local image wikilinks; rewrite text wikilinks to markdown links the
// rest of `marked` can consume. Unresolved links fall back to a dim inline
// span so the reader can still see the intended target.
export function preprocessNoteBody(body: string, index: NoteIndex): string {
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

  // Drop ![[...]] entirely — including optional size tail like |350.
  body = body.replace(/^!\[\[[^\]\n]+\]\][ \t]*\r?\n?/gm, '');
  body = body.replace(/!\[\[[^\]\n]+\]\]/g, '');

  body = body.replace(
    /\[\[([^\]\n]+?)\]\]/g,
    (_m, inner: string) => {
      const [rawTarget, rawAlias] = inner.split('|');
      const target = rawTarget.split('#')[0].trim();
      const alias = rawAlias?.trim();
      const r = index.resolve[target.toLowerCase()];
      if (!r) {
        const label = alias || target;
        return `<span class="wikilink-missing">${escapeHtml(label)}</span>`;
      }
      const label = alias || r.title;
      // Escape square brackets in label so marked doesn't re-parse it.
      const safe = label.replace(/[\[\]]/g, '');
      return `[${safe}](/note/${r.type}/${r.slug})`;
    }
  );

  return body;
}

export function renderNoteMarkdown(body: string, index: NoteIndex): string {
  return marked.parse(preprocessNoteBody(body, index), { async: false }) as string;
}
