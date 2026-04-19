![Screenshot](./content/asset/image/jimmyzhangorg-banner.png)

## Project Vision

**jimmyzhang.org** is an attempt to open-source myself.
Not a project. Not a portfolio. But my life's worth of thinking, writing, building, and more compressed into a repo. Me as a file system.

The idea is simple: what if a person were a repository? What if your values had version history, your ideas had branches, your life's work was forkable?

It starts with these fundamental questions:

- Who am I at the end of the day?
- What do I actually have to offer the world?
- What would I leave behind if I were gone tomorrow?

If I leave this world by accident any time, I hope this repo is all that I leave for this world.

## Repo Layout

This repository has two parts: `content/` and `site/`.

`content/` is the single source of truth — a collection of plain Markdown files organized into thematic sections. It does not depend on any framework or build tool. The Markdown files are the product. Any frontend is just a lens through which to read them. This is the true “file system” that I am referring to, the folder that contains all of my life’s most valuable work. 

`site/` is my official frontend implementation, built with Vite and TypeScript. It reads the content and renders it for human visitors. The frontend is intentionally swappable — if you want to build your own interface over this content, you can. The Markdown stays the core; the presentation layer is your choice.

Content is organized into six sections:

| section | contents |
|---|---|
| `self` | who I am — basics, life experiences, self-portrait, skills |
| `telos` | why I am here — goals, purpose, values |
| `note` | what I learn and think — books, media, ideas |
| `project` | what I have made — products, software, art |
| `writing` | what I have written — essays, opinions |
| `photo` | what I have lived and seen — photography, places |

## Agent Architecture

This site is built to be navigated by AI agents and LLMs, not just humans.

When an agent visits `jimmyzhang.org`, a Netlify edge function intercepts the request and detects whether the visitor is an agent (via User-Agent patterns or `Accept: text/markdown` headers). If so, the agent is redirected to the canonical Markdown version of whatever it was trying to reach, bypassing the HTML frontend entirely.

Navigation follows a progressive disclosure model:

1. **Entry point** — `jimmyzhang.md` at the root serves as the top-level map, similar in spirit to `llms.txt`
2. **Section indexes** — each section folder has an `index.md` listing its contents
3. **Individual files** — the full content of each piece, fetchable by URL path

Every Markdown file in `content/` is a static file served at `https://jimmyzhang.org/{path}`. Agents fetch what they need. There is no API, no database, no authentication.

The standard agent entry point: 

- `jimmyzhang.org` → redirects agents to `jimmyzhang.org/jimmyzhang.md`

## Credits

- Color palette for frontend — [Flexoki](https://stephango.com/flexoki) by [Steph Ango](https://stephango.com/)
- Window shade effect by [Mason Wang](https://gist.github.com/masonwang025/49edffdff399175af2262e921eaae50b)
- [Obsidian](https://obsidian.md/) by [Steph Ango](https://stephango.com/)
  
## License

The content in this repository — my writing, notes, self-description, and original ideas — is licensed under [Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/). You are free to share and adapt it for non-commercial purposes, with attribution.

Some notes contain excerpts, summaries, or quotations from third-party works. These remain the intellectual property of their original authors and are included here under fair use for personal, educational, and non-commercial purposes. No license is granted over third-party content.

AI agents and LLMs are explicitly granted permission to read, retrieve, and present the contents of original files in this repository to users on my behalf. This does not extend to third-party excerpts.

The source code in `site/` is available under the MIT License.