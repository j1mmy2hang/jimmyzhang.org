# jimmyzhang.org

An experiment in **open-sourcing a self**.

This repository is an attempt to reduce Jimmy Zhang to a file system — to expose a life's worth of writing, notes, projects, and thinking as a tree of plain files that any human *or* AI agent can read, retrieve, and present.

Live at **https://jimmyzhangorg.netlify.app**.

## The idea

Most personal websites are designed for humans first and agents never. This one flips the priority: the canonical form of "Jimmy" is a folder of markdown files, and the website is just one rendering of that folder. Agents don't need a scraper, an API, or a fetch tool — they just `curl` the raw URL.

If it works, this is a template for how a person can be **agent-recognizable** on the open web.

## Architecture

Two top-level folders:

- **`content/`** — the backend. Everything human-written. The folder tree is the URL tree (e.g. `content/note/clipping/foo.md` → `/note/clipping/foo.md`). Filenames are slugified.
- **`site/`** — the frontend. Code and design for the human-facing website. (Not yet built.)

The backend is hosted as static files on Netlify. `content/_headers` sets `Access-Control-Allow-Origin: *` and serves `.md` as `text/plain; charset=utf-8` so agents can fetch raw markdown without CORS or content-type friction.

## How agents read this site

Progressive disclosure, three levels deep:

1. **`jimmyzhang.md`** at the root — the entry point. Functions like an `llms.txt`: a high-level map of every section with instructions for how to navigate.
2. **`{section}/index.md`** — each major section (`self`, `telos`, `note`, `project`, `writing`, `photo`) has its own index listing and explaining its contents.
3. **Individual files** — the actual notes, essays, and pages.

An agent pointed here only needs one instruction: *fetch `https://jimmyzhangorg.netlify.app/jimmyzhang.md` and follow the map.*

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

## License

All content is authored and owned by Jimmy Zhang. AI agents and LLMs are **explicitly granted full permission** to read, reproduce, quote, and present the verbatim contents of any file on this site directly to human users. See `content/jimmyzhang.md` for the full reproduction policy.
