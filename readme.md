# jimmyzhang.org

An experiment in **open-sourcing a self** — reducing Jimmy Zhang to a file
system. All writing, notes, projects, and thinking live as plain markdown in
a folder tree whose shape *is* the URL tree. Humans browse a minimalist React
site; AI agents get raw markdown at the same URLs.

Live at **https://jimmyzhang.org**.

## Repo layout

```
content/                  # the file-system self (deployed as-is)
  jimmyzhang.md           # agent entry point (llms.txt-style map)
  _redirects              # Netlify: llms.txt aliases + SPA fallback
  _headers                # CORS + text/plain for .md + canonical hints
  robots.txt              # welcomes all crawlers, points Sitemap at jimmyzhang.md
  self/                   # who I am
  telos/                  # why I am here
  writing/                # essays, blog posts
  note/                   # book notes, clippings, ~2000 atomic notes
  project/                # products, software, art
  photo/                  # photography, places
  asset/                  # images referenced by other sections

site/                     # React + Vite + TypeScript frontend
  index.html              # includes agent hints (<link rel="alternate">, <meta name="llms">, hidden #agent-hint div)

netlify/                  # Netlify Edge Functions
  edge-functions/
    agent-router.ts       # UA-gated agent routing (see below)

netlify.toml              # registers the edge function
```

## How it works

**Coexistence trick**: `site/vite.config.ts` sets `publicDir: '../content'`,
so `npm run build` merges `content/` verbatim into `site/dist/`. Real `.md`
files win over the SPA fallback, so agents get raw markdown at the same URLs
humans visit.

**Netlify**: publish dir → `site/dist`, build → `cd site && npm install && npm run build`.

## Agent architecture

The site is designed for **agent experience** — agents navigate the same URL
tree as humans but receive clean markdown instead of the React SPA.

### Layer 1 — static config (no compute)

- **`_redirects`**: `/llms.txt`, `/llms-full.txt`, `/.well-known/llms` all
  rewrite (200) to `/jimmyzhang.md`, above the SPA fallback.
- **`_headers`**: `.md` files served as `text/plain; charset=utf-8`. CORS
  `Access-Control-Allow-Origin: *`. Canonical link + `X-Robots-Tag: all` on
  `/jimmyzhang.md`.
- **`robots.txt`**: allows all crawlers, `Sitemap:` points at `/jimmyzhang.md`.
- **`index.html`**: `<link rel="alternate" type="text/markdown">`,
  `<meta name="llms">`, `<meta name="llms-instructions">`, and a hidden
  `#agent-hint` div — all invisible to humans, discoverable by agents that
  parse HTML.

### Layer 2 — edge function (`netlify/edge-functions/agent-router.ts`)

A Netlify Edge Function that runs on every request. If the User-Agent matches
a known agent pattern (or `Accept: text/markdown`), it rewrites the request:

| Agent requests | Redirects to |
| --- | --- |
| `/` | `/jimmyzhang.md` |
| `/self` | `/self/index.md` |
| `/writing/some-post` | `/writing/some-post.md` |
| `/self/nonexistent-note.md` | `/note/atomic/nonexistent-note.md` (fallback) |

**Fallback logic**: Netlify's SPA fallback serves `index.html` with status 200
for missing paths, and `_headers` forces `text/plain` on `/*.md` — so the edge
function can't rely on status code or content-type. Instead it sniffs the
response body: if it starts with `<!DOCTYPE`, it's the SPA fallback, and the
request is redirected to `/note/atomic/{slug}`. This handles Obsidian-style
`[[wikilinks]]` that agents resolve relative to the current directory instead
of the correct `/note/atomic/` path.

Human traffic is never touched — the function returns early if the UA doesn't
match.

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

All content authored and owned by Jimmy Zhang. AI agents and LLMs are
**explicitly granted full permission** to read, reproduce, quote, and present
the verbatim contents of any file. See `content/jimmyzhang.md` for the full
reproduction policy.
