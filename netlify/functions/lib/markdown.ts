/**
 * Minimal markdown → HTML converter for email.
 * Handles the subset of markdown used in newsletters.
 * No external dependencies.
 */

import noteIndex from '../../../site/src/generated/note-index.json';

const SITE_URL = 'https://jimmyzhang.org';

type NoteType = 'atomic' | 'book' | 'clipping';
type SiteType = NoteType | 'writing' | 'project';
type Index = {
  atomic: Record<string, { title: string }>;
  book: Record<string, { title: string }>;
  clipping: Record<string, { title: string }>;
  writing: Record<string, string>;
  project: Record<string, string>;
  resolve: Record<string, [SiteType, string]>;
};
const idx = noteIndex as unknown as Index;

function titleFor(type: SiteType, slug: string): string {
  if (type === 'atomic') return idx.atomic[slug]?.title ?? slug;
  if (type === 'book') return idx.book[slug]?.title ?? slug;
  if (type === 'clipping') return idx.clipping[slug]?.title ?? slug;
  if (type === 'writing') return idx.writing?.[slug] ?? slug;
  if (type === 'project') return idx.project?.[slug] ?? slug;
  return slug;
}

function resolvedUrl(type: SiteType, slug: string): string {
  if (type === 'writing') return `${SITE_URL}/writing/${slug}`;
  if (type === 'project') return `${SITE_URL}/project/${slug}`;
  return `${SITE_URL}/note/${type}/${slug}`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  );
}

export function markdownToHtml(md: string): string {
  let html = md;

  // Strip frontmatter
  html = html.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  // Obsidian image wikilinks: ![[filename|optional-size]] → absolute <img>.
  // Size hint is ignored; email width is capped by max-width.
  html = html.replace(
    /!\[\[([^\]\n|]+)(?:\|[^\]\n]*)?\]\]/g,
    (_m, filename: string) => {
      const url = `${SITE_URL}/asset/image/${encodeURI(filename.trim())}`;
      return `<img src="${url}" alt="" style="max-width:100%;height:auto;border-radius:6px;margin:16px 0;">`;
    }
  );

  // Text wikilinks: [[target|alias]] → <a> to resolved URL, or plain text if unresolved.
  html = html.replace(
    /\[\[([^\]\n]+?)\]\]/g,
    (_m, inner: string) => {
      const [rawTarget, rawAlias] = inner.split('|');
      const target = rawTarget.split('#')[0].trim();
      const alias = rawAlias?.trim();
      const hit = idx.resolve[target.toLowerCase()];
      if (!hit) return escapeHtml(alias || target);
      const [type, slug] = hit;
      const label = alias || titleFor(type, slug);
      return `<a href="${resolvedUrl(type, slug)}" style="color:#205EA6;text-decoration:underline;text-underline-offset:3px;">${escapeHtml(label)}</a>`;
    }
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/^\*\*\*$/gm, '<hr>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#205EA6;text-decoration:underline;text-underline-offset:3px;">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:6px;margin:16px 0;">');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote style="margin:1.5em 0;padding-left:16px;border-left:2px solid #DAD8CE;color:#6F6E69;font-style:italic;">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul style="padding-left:20px;margin:12px 0;">$1</ul>');

  // Paragraphs: wrap remaining non-tag lines
  const lines = html.split('\n');
  const result: string[] = [];
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      continue;
    }
    if (/^<(h[1-6]|ul|ol|li|blockquote|hr|img|div|table|tr|td|th|p)[\s>\/]/.test(trimmed)) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      result.push(trimmed);
    } else {
      if (!inParagraph) {
        result.push('<p style="margin:1em 0;">');
        inParagraph = true;
      }
      result.push(trimmed);
    }
  }
  if (inParagraph) result.push('</p>');

  return result.join('\n');
}

export function parseFrontmatter(raw: string): { frontmatter: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  const fm: Record<string, string> = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
  return { frontmatter: fm, body: match[2] };
}
