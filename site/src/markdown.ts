import { marked, type Tokens } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

// --- Global rendering rules for the whole site ------------------------ *
// Jimmy's content uses Obsidian-flavoured markdown, but on the web we
// deliberately hide a few decorations so the prose stays uniform:
//   • **bold**, __bold__          — rendered as plain text
//   • *italic*, _italic_          — rendered as plain text
//   • ==highlight==               — rendered as plain text
//   • > [!note]-style callouts    — removed entirely
//   • <u>underline</u>            — tag removed, inner text kept
// Code blocks and inline code are left alone.
// ------------------------------------------------------------------- *

// Apply a transform only to the non-code portions of the source.
function stripOutsideCode(md: string, fn: (chunk: string) => string): string {
  const parts = md.split(/(```[\s\S]*?```|`[^`\n]+`)/);
  return parts.map((p, i) => (i % 2 === 0 ? fn(p) : p)).join('');
}

export function stripObsidianDecorations(md: string): string {
  return stripOutsideCode(md, (chunk) =>
    chunk
      // Obsidian callout block: leading `> [!type]` line plus any
      // following `>` continuation lines.
      .replace(/^> \[![^\]]+\][^\n]*(?:\r?\n> [^\n]*)*\r?\n?/gm, '')
      // ==highlight== → highlight
      .replace(/==([^=\n]+)==/g, '$1')
      // <u>...</u> → ...
      .replace(/<\/?u\s*>/gi, '')
  );
}

// Override marked's renderer to drop <strong>/<em> wrappers — the inner
// inline content still renders normally.
marked.use({
  renderer: {
    strong(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Strong) {
      return this.parser.parseInline(token.tokens ?? []);
    },
    em(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Em) {
      return this.parser.parseInline(token.tokens ?? []);
    },
  },
});

export { marked };
