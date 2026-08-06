<div align="center">

# Me, Opensourced

<br>
My life's work of thinking, writing, building, and more — compressed into a repo.  
<br>

**"Me as a file system"**

<br>

[Visit my website](https://jimmyzhang.org) &nbsp;·&nbsp; [Project Vision](#project-vision)

<br>

![jimmyzhangorg-banner](./content/asset/image/jimmyzhangorg-banner.png)

</div>

<br>

## Project Vision

It starts with these fundamental questions:

> Who am I at the end of the day?  
> What do I actually have to offer the world?  

If I leave this world by accident any time, I hope this repo is all that I leave for this world.

This is the official entry point for the world to learn about me.

<br>


## Repo Layout

This repository has two main parts: `content/` and `site/`.

### Content/ — MD as source of truth

**`content/`** is the actual file system and the only source of truth. It's a collection of plain Markdown files organized into thematic sections. It does not depend on any framework or build tool. The Markdown files *are* the product. Any frontend is just a lens through which to read them.

`content` is divided into several sections or folders. 

| Section | Contents |
|---|---|
| `self` | Who I am — basics, life experiences, self-portrait, skills |
| `telos` | Why I am here — goals, purpose, values |
| `note` | What I learn and think — books, media, ideas |
| `project` | What I have made — products, software, art |
| `writing` | What I have written — essays, opinions |
| `photo` | What I have lived and seen — photography, places |

<br>

### Site/ — my frontend

**`site/`** is the official frontend implementation, built with Vite and TypeScript. It reads the content and renders it for human visitors. The frontend is intentionally swappable — build your own interface over this content if you want. The Markdown stays the core; the presentation layer is your choice.

My frontend design is heavily influenced by [Steph Ango](https://stephango.com)'s personal website. 

<br>

### Design Philosophy

Content is the core. At the outer layer is Site, the WebUI, through which the human reads it.

It is designed to be platform- and tool-agnostic, grounded in the time-enduring nature of plain Markdown files.
<br>
<br>


## Credits

- Color palette — [Flexoki](https://stephango.com/flexoki) by [Steph Ango](https://stephango.com/)
- Window shade effect — [Mason Wang](https://gist.github.com/masonwang025/49edffdff399175af2262e921eaae50b)
- Notes written in [Obsidian](https://obsidian.md/) by [Steph Ango](https://stephango.com/)
<br>
<br>


## License

The **content** in this repository — my writing, notes, self-description, and original ideas — is licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). You are free to share and adapt it for non-commercial purposes, with attribution.

Some notes contain excerpts, summaries, or quotations from third-party works. These remain the intellectual property of their original authors and are included under fair use for personal, educational, and non-commercial purposes. No license is granted over third-party content.

The **source code** in `site/` is available under the MIT License.
