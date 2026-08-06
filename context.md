# jimmyzhang.org

An experiment in **open-sourcing a self** — reducing Jimmy Zhang to a file
system. All writing, notes, projects, and thinking live as plain markdown in
a folder tree whose shape *is* the URL tree, browsed through a minimalist
React site.

Live at **https://jimmyzhang.org**.

## Repo layout

```
content/                  # the file-system self (deployed as-is)
  _redirects              # Netlify: note-uid short links + SPA fallback
  _headers                # text/plain for .md + cache policy
  robots.txt              # allows all crawlers
  self/                   # who I am
  telos/                  # why I am here
  writing/                # essays, blog posts
  note/                   # book notes, clippings, ~2000 atomic notes
  project/                # products, software, art
  photo/                  # photography, places
  asset/                  # images referenced by other sections

site/                     # React + Vite + TypeScript frontend

netlify/functions/        # newsletter (subscribe, send, preview, unsubscribe)
```

## How it works

**Coexistence trick**: `site/vite.config.ts` sets `publicDir: '../content'`,
so `npm run build` merges `content/` verbatim into `site/dist/`. The markdown
files are served as static assets at the same URLs the SPA routes to.

**Netlify**: publish dir → `site/dist`, build → `cd site && npm install && npm run build`.
There is no `netlify.toml`; build settings live in the Netlify UI.

**Markdown is fetched at runtime.** `site/src/hooks/useMarkdown.ts` does a plain
`fetch(path)` and reads `.text()`. This is why `content/_headers` forces
`Content-Type: text/plain` on `/*.md` — that rule is load-bearing for the site,
not an optimization. Don't remove it.

## Frontend

Reference aesthetic: **stephango.com**. Palette: **Flexoki**.

- `html { font-size: 62.5% }` → 1rem = 10px. All rem values assume this base.
- Fonts: **Bamberg Serial** (self-hosted, 400/700) for titles, **Libre Bodoni**
  (Google Fonts) for the home hero, system serif fallback.
- Theme toggle: fixed bottom-right, cross-fades sun/moon SVGs, respects
  `prefers-reduced-motion`. Default: light.

### Two markdown loading strategies

1. **Runtime fetch** (`useMarkdown` hook) — for individual pages.
2. **Build-time glob** (`import.meta.glob`) — for index listings (writing).
   Do **not** use for `/note/atomic` (~2000 files) — use a JSON manifest instead.

## License

Content is CC BY-NC 4.0; source in `site/` is MIT. See `readme.md`.
