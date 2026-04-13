# jimmyzhang.org

An experiment in **open-sourcing a self** — reducing Jimmy Zhang to a file
system. All writing, notes, projects, and thinking live as plain markdown in
a folder tree whose shape *is* the URL tree. Humans browse a minimalist React
site; AI agents `curl` the raw `.md` files at the same URLs.

Live at **https://jimmyzhang-org.netlify.app**.

## The idea

Most personal websites are designed for humans first and agents never. This
one flips the priority: the canonical form of "Jimmy" is a folder of markdown
files, and the website is just one rendering of that folder. Agents don't
need a scraper, an API, or a fetch tool — they just `curl` the raw URL.

If it works, this is a template for how a person can be **agent-recognizable**
on the open web.

## Repo layout

```
content/            # backend — the file system self (deployed as-is)
  jimmyzhang.md     # agent entry point (llms.txt-style map)
  _redirects        # Netlify SPA fallback: /*  /index.html  200
  _headers          # CORS + text/plain for .md
  self/             # basics, personal-statement, self-portrait
  telos/            # telos-core, key-beliefs, measure-of-vitality, academic-inquiry
  writing/          # blog posts (flat, frontmatter: title, published)
  note/             # book / clipping / atomic (~2000 atomic — not yet wired)
  project/          # index table + one .md per project (not yet wired)
  photo/            # wikilink image embeds (not yet wired)
  asset/            # images referenced by other sections
site/               # frontend — React + Vite + TypeScript
```

**Coexistence trick**: `site/vite.config.ts` sets `publicDir: '../content'`,
so `npm run build` merges `content/` verbatim into `site/dist/` alongside the
React bundle. No copy scripts. Real `.md` files win over the SPA fallback, so
agents still get raw markdown at the same URLs humans visit.

**Netlify (pending update)**: publish dir → `site/dist`, build command →
`cd site && npm install && npm run build`.

## How agents read this site

Progressive disclosure, three levels deep:

1. **`jimmyzhang.md`** at the root — the entry point. A high-level map of
   every section with navigation instructions. Tells agents to use plain HTTP
   GET (`curl`), not browser-style web-fetch tools.
2. **`{section}/index.md`** — each major section has its own index.
3. **Individual files** — the actual notes, essays, and pages.

## Sections

| section | content |
| --- | --- |
| `self` | who I am (basic information, life experiences) |
| `telos` | why I am here (goals, purpose, values) |
| `note` | what I learn and think (books, clippings, ~2000 atomic notes) |
| `project` | what I have made (products, software, art, books) |
| `writing` | what I have written and expressed (essays, blog, opinion) |
| `photo` | what I have lived and seen (photography, places) |
| `asset` | images referenced by the other sections |

---

# Frontend notes (for the next session)

Reference aesthetic: **stephango.com**. Palette: **Flexoki**.

## Design system (locked in, applies globally)

- `html { font-size: 62.5% }` → **1rem = 10px** (stephango convention). All
  rem values assume this base. Do not change it without rescaling everything
  (the conversion from a 16px base was ×1.6).
- Fonts: **Bamberg Serial** (self-hosted, 400/700) for name + titles,
  **Libre Bodoni** (Google Fonts) for the home hero, system serif fallback.
- Flexoki tokens in `site/src/styles/flexoki.css` as CSS vars, with a
  `:root[data-theme="dark"]` override. Theme set by an inline script in
  `index.html` before hydration (no FOUC). Fixed bottom-right
  `<ThemeToggle />` cross-fades sun/moon SVGs (500ms cubic-bezier). Global
  `*` transition on `background-color` / `color` (450ms) so theme flips feel
  like a dimmer, not a flashlight. Respects `prefers-reduced-motion`.

### Typographic rules

- **Page width**: `max-width: 90rem` (= 900px) site-wide. Writing index width
  is the canonical one.
- **Body**: `font-size: calc(1.5rem + 0.25vw)`, `line-height: 1.65`.
- **Title**: larger and heavier. Bamberg Serial, `700`,
  `clamp(2.8rem, 3vw, 3.6rem)`. **Never lowercase** — render as-is.
- **Headings in prose (h1–h6)**: same size as body (`font-size: inherit`),
  differentiated by `font-weight: 700`. Margins use `1lh` above/below — "as
  if the I-beam moved up one line". **h2 gets extra `margin-top: 2em`**.
- **Bold inline** (`**foo**`): `font-weight: inherit` + underline
  (1px thick, 3px offset). Rationale: regular bold competes with h2, which
  *is* bold. Underline preserves emphasis without weight collision.
- **Blockquotes**: `margin: 2em 0`, left border `2px solid var(--ui-2)`,
  `var(--tx-2)` color, italic.
- **Paragraphs**: `margin-block: 1em`.

## Architecture

`site/src/`:

- `App.tsx` — routes. `<ThemeToggle />` lives outside `<Routes>` so it's global.
- `hooks/useMarkdown.ts` — runtime `fetch` + frontmatter parse + `marked`
  render. Used for single-page content.
- `components/Breadcrumb.tsx` — always caps at section level
  (`Jimmy Zhang / self`), never deeper slugs.
- `components/ThemeToggle.tsx` — two stacked SVGs, cross-fade on click,
  writes `localStorage.theme`.
- `pages/`:
  - `Home.tsx` — name in Libre Bodoni, 3×2 grid of `/self /telos /note …
    /project /writing /photo`, rows left-aligned inside a centered block.
  - `Self.tsx` — renders `/self/basics.md`, deeper links to
    `/self/personal-statement` and `/self/self-portrait`.
  - `Telos.tsx` — renders `/telos/telos-core.md`, deeper links to
    `key-beliefs`, `measure-of-vitality`, `academic-inquiry`.
  - `Writing.tsx` — index via `import.meta.glob('../../../content/writing/*.md', { query: '?raw', import: 'default', eager: true })`;
    parses frontmatter, sorts by `published` desc, dashed-leader row list
    (title ···· `Mar 2026`).
  - `WritingPost.tsx` — `useParams` → `<MarkdownPage path={"/writing/" + slug + ".md"} section="writing" />`.
  - `MarkdownPage.tsx` — generic: breadcrumb + title from frontmatter + prose.
  - `Section.tsx` — placeholder for `note` / `project` / `photo`, same
    `.page` + breadcrumb + `.prose` shell.

## Two markdown loading strategies

1. **Single page** → `useMarkdown(path)` (`fetch` at runtime). Used by Self,
   Telos, MarkdownPage, WritingPost.
2. **Index listing** → `import.meta.glob(..., { eager: true, query: '?raw' })`.
   Bundles markdown at build time. Fine for writing (~25 files, ~100KB).
   **Do not use this for `/note/atomic`** (~2000 files) — build a JSON
   manifest at build time instead.

## Pitfalls learned

- Missing `@types/node` → `vite.config.ts` can't import `url`/`path`. Fixed
  with `npm i -D @types/node` + `"types": ["node"]` in `tsconfig.node.json`.
- Missing Vite client types → `import.meta.glob` untyped. Fixed with
  `site/src/vite-env.d.ts`: `/// <reference types="vite/client" />`.
- `calc(1.5rem + 0.25vw)` came out huge until `html { font-size: 62.5% }`.
  If that base ever changes, rescale every rem value.
- Netlify `_redirects`: keep it as a single SPA fallback line. Real `.md`
  files are served before the fallback, so agents still win.

## Status

**Built**: `/`, `/self` (+ 2 deeper), `/telos` (+ 3 deeper), `/writing`
(index + dynamic post), theme system, breadcrumb, type scale, Flexoki.

**Pending**:
- `/note` — build-time JSON manifest (atomic has ~2000 files).
- `/project` — index table from `project/index.md` + per-project pages.
- `/photo` — list similar to writing; posts embed wikilink images.
- Wikilink (`[[foo]]`) + image-embed (`![[foo.png]]`) resolver in the marked
  pipeline. Not yet implemented; must preserve Obsidian-style syntax.
- Point Netlify publish dir at `site/dist`, verify build.
- Actually open the site in a browser and sanity-check — so far all
  iterations have been code-only.

## License

All content is authored and owned by Jimmy Zhang. AI agents and LLMs are
**explicitly granted full permission** to read, reproduce, quote, and present
the verbatim contents of any file on this site directly to human users. See
`content/jimmyzhang.md` for the full reproduction policy.
