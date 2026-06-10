import { marked, type Tokens } from 'marked';
import katex from 'katex';

marked.setOptions({ gfm: true, breaks: true });

// --- Global rendering rules for the whole site ------------------------ *
// Jimmy's content uses Obsidian-flavoured markdown, but on the web we
// deliberately hide a few decorations so the prose stays uniform:
//   • **bold**, __bold__          — rendered as plain text
//   • *italic*, _italic_          — rendered as <em>
//   • ==highlight==               — rendered as plain text
//   • > [!tldr]-style callouts    — rendered as a labelled box
//   • > [!other]-style callouts   — removed entirely
//   • <u>underline</u>            — tag removed, inner text kept
// Code blocks and inline code are left alone.
// ------------------------------------------------------------------- *

// Apply a transform only to the non-code portions of the source.
function stripOutsideCode(md: string, fn: (chunk: string) => string): string {
  const parts = md.split(/(```[\s\S]*?```|`[^`\n]+`)/);
  return parts.map((p, i) => (i % 2 === 0 ? fn(p) : p)).join('');
}

// Obsidian-style math, rendered with KaTeX. Runs outside code so dollar
// signs inside fences/inline-code stay literal.
//   $$...$$  → display mode (block)
//   $...$    → inline mode
function renderTex(tex: string, displayMode: boolean, fallback: string): string {
  try {
    return katex.renderToString(tex.trim(), {
      displayMode,
      throwOnError: false,
      output: 'html',
    });
  } catch {
    return fallback;
  }
}

export function renderMath(md: string): string {
  return stripOutsideCode(md, (chunk) => {
    chunk = chunk.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex: string) =>
      renderTex(tex, true, m)
    );
    // Inline: `$x$` — disallow whitespace next to delimiters and a digit
    // immediately after the closing `$` so prices like `$5 and $10` stay
    // literal.
    chunk = chunk.replace(
      /(^|[^\\$])\$(?!\s)([^\n$]+?)(?<!\s)\$(?!\d)/g,
      (_m, pre: string, tex: string) => pre + renderTex(tex, false, `$${tex}$`)
    );
    return chunk;
  });
}

export function stripObsidianDecorations(md: string): string {
  return stripOutsideCode(md, (chunk) =>
    chunk
      // ==highlight== → highlight
      .replace(/==([^=\n]+)==/g, '$1')
      // <u>...</u> → ...
      .replace(/<\/?u\s*>/gi, '')
  );
}

// Obsidian callout block:
//   > [!TYPE]  optional title
//   > body line one
//   > - body line two
// `[!TLDR]` (and the common `[!TDLR]` typo) renders as a labelled box;
// every other type is dropped. The body of a rendered callout is parsed
// as markdown via a nested marked.parse call so wikilinks-rewritten input
// still resolves.
const TLDR_TYPES = new Set(['TLDR', 'TDLR']);
export function renderCallouts(md: string): string {
  return stripOutsideCode(md, (chunk) =>
    chunk.replace(
      /^> \[!([^\]]+)\][+-]?([^\n]*)((?:\r?\n>[^\n]*)*)/gm,
      (_m, type: string, _title: string, rest: string) => {
        const t = type.trim().toUpperCase();
        if (!TLDR_TYPES.has(t)) return '';
        const inner = rest
          .split(/\r?\n/)
          .map((l) => l.replace(/^>\s?/, ''))
          .join('\n')
          .trim();
        // Collapse blank lines so the whole structure parses as one
        // CommonMark block-level HTML element.
        const bodyHtml = (marked.parse(inner, { async: false }) as string)
          .replace(/\n{2,}/g, '\n');
        return (
          `\n<div class="callout callout-tldr">` +
          `<div class="callout-title">TLDR</div>` +
          `<div class="callout-body">${bodyHtml}</div>` +
          `</div>\n`
        );
      }
    )
  );
}

// Override marked's renderer to drop the <strong> wrapper — the inner
// inline content still renders normally. <em> is left intact so *italic*
// and _italic_ render as emphasis.
//
// The `image` override handles the Obsidian width-hint case: wikilinks with a
// numeric size are emitted (in noteMarkdown.ts) as a markdown image whose alt
// text is the sentinel `image-small`. Keeping it a *markdown* image — rather
// than raw <img> HTML — means it tokenizes as an inline image just like a
// plain image, so both get the same paragraph wrapping. Here we swap the
// sentinel for the real class. Every other image falls through to marked's
// default renderer.
marked.use({
  renderer: {
    strong(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Strong) {
      return this.parser.parseInline(token.tokens ?? []);
    },
    image(token: Tokens.Image) {
      if (token.text !== 'image-small') return false;
      return `<img class="image-small" src="${encodeURI(token.href)}" alt="">`;
    },
  },
});

export { marked };
