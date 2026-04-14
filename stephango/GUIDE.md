# stephango.com — Style Guide

A reverse-engineered walkthrough of Steph Ango's personal site so you can learn and replicate the look. Files in this folder:

- `index.html` — homepage HTML, untouched
- `styles.css` — original (minified, one long line)
- `styles.pretty.css` — beautified version for reading (~1180 lines)
- `GUIDE.md` — this file

> **Copyright note.** The CSS header says *"Copyright Steph Ango, stephango.com. Please do not reproduce without permission."* Use this as a **learning reference**: study the techniques, rebuild them in your own file, pick your own class names. Don't ship `styles.css` verbatim on a public site without asking him.

---

## 1. The big ideas

What makes the site feel good isn't any single trick — it's a small number of disciplined choices applied consistently.

1. **One content column, two widths.** Everything lives in `--wrap-normal: 37em` (~37 characters of body text), with an optional `--wrap-wide: 54em` for images/tables. No sidebars. No grid. That single constraint does most of the visual work.
2. **Fluid type.** Body text is `calc(1.5rem + .25vw)` — grows slightly with the viewport. Headings use the same trick: `h1` is `calc(1.35em + .55vw)`. No breakpoint jumps.
3. **`font-size: 62.5%` on html.** Makes `1rem = 10px`, so `1.8rem = 18px`. Lets the rest of the sheet think in "close-to-pixel" units while respecting user zoom.
4. **System font stack, no webfonts.** `-apple-system, BlinkMacSystemFont, "Inter", "IBM Plex Sans", Segoe UI, Helvetica, Arial, sans-serif`. Zero network cost. Looks native everywhere.
5. **Flexoki color palette.** A hand-tuned, paper-ink palette by the same author (github.com/kepano/flexoki). Light mode uses `#FFFCF0` (paper) on `#100F0F` (near-black). Dark mode flips. Every color is a CSS var, which is why theme switching is a single class toggle (`.theme-dark`).
6. **Semantic tokens on top of raw palette.** Raw colors (`--flexoki-blue-600`) are never used directly in components. Instead there are semantic aliases: `--color-tx-normal`, `--color-tx-muted`, `--color-tx-faint`, `--color-bg-primary`, `--color-bg-secondary`, `--color-ui-normal/hover/active`, `--color-action`. That layer is what makes dark mode a one-line override.
7. **Utility classes for rhythm.** Spacing is expressed with short utilities (`.pa`, `.pt`, `.ppa`, `.ms1..ms4`, `.mn1..mn4`). Everything snaps to **1rem / 2rem / 4rem / 6rem / 8rem**. No arbitrary numbers.
8. **Heading weight trick.** `--heading-weight: 500` on desktop, `600` on mobile. Thinner headings on big screens read more "editorial"; bolder on small screens keeps contrast.
9. **External link affordance.** Any `<a>` that isn't internal gets an inline SVG arrow appended via `background-image` — a subtle tell without cluttering markup.
10. **Anchor icons on headings.** Hover a heading, a small chain SVG fades in to its left (mask-image + opacity transition). Pure CSS, no JS.

---

## 2. Design tokens (copy these first)

```css
:root {
  /* typography */
  --font-content: -apple-system, BlinkMacSystemFont, "Inter", "IBM Plex Sans",
                  Segoe UI, Helvetica, Arial, sans-serif;
  --font-ui:      var(--font-content);
  --font-mono:    ui-monospace, SFMono-Regular, "Cascadia Code", "IBM Plex Mono",
                  "Roboto Mono", Menlo, Monaco, "Consolas", monospace;

  --font-small:   0.875em;
  --font-smaller: 0.8em;
  --line-height:  1.5;
  --heading-weight: 500;

  /* layout */
  --wrap-normal:  37em;   /* body column */
  --wrap-wide:    54em;   /* images / tables */
  --input-width:  20em;
  --border-radius: 4px;
  --image-radius:  6px;
}

@media (max-width: 860px) {
  :root {
    --wrap-normal:    88vw;
    --wrap-wide:      100vw;
    --input-width:    100%;
    --heading-weight: 600;
  }
}
```

Flexoki palette (abridged — grab the full set from `styles.pretty.css` lines 117–238, or from github.com/kepano/flexoki which is MIT-licensed):

```css
:root {
  --flexoki-paper: #FFFCF0;
  --flexoki-black: #100F0F;
  --flexoki-50:  #F2F0E5;  --flexoki-100: #E6E4D9;  --flexoki-150: #DAD8CE;
  --flexoki-200: #CECDC3;  --flexoki-300: #B7B5AC;  --flexoki-400: #9F9D96;
  --flexoki-500: #878580;  --flexoki-600: #6F6E69;  --flexoki-700: #575653;
  --flexoki-800: #403E3C;  --flexoki-850: #343331;  --flexoki-900: #282726;
  --flexoki-950: #1C1B1A;
  /* plus red/orange/yellow/green/cyan/blue/purple/magenta, 50..950 each */
}
```

Semantic layer (the thing you actually use in rules):

```css
:root, .theme-light {
  --color-bg-primary:   var(--flexoki-paper);
  --color-bg-secondary: var(--flexoki-50);
  --color-tx-normal:    var(--flexoki-black);
  --color-tx-muted:     var(--flexoki-600);
  --color-tx-faint:     var(--flexoki-300);
  --color-ui-normal:    var(--flexoki-100);
  --color-ui-hover:     var(--flexoki-150);
  --color-ui-active:    var(--flexoki-200);
  --color-highlight:    var(--flexoki-yellow-100);
  --color-action:       var(--flexoki-cyan-600);
  --color-bg-hover:     var(--flexoki-cyan-50);
  --color-selection:    rgba(187,220,206,0.3);
}
.theme-dark {
  --color-bg-primary:   var(--flexoki-black);
  --color-bg-secondary: var(--flexoki-950);
  --color-tx-normal:    var(--flexoki-200);
  --color-tx-muted:     var(--flexoki-500);
  --color-tx-faint:     var(--flexoki-700);
  --color-ui-normal:    var(--flexoki-900);
  --color-ui-hover:     var(--flexoki-850);
  --color-ui-active:    var(--flexoki-800);
  --color-highlight:    var(--flexoki-yellow-900);
  --color-action:       var(--flexoki-cyan-400);
  --color-bg-hover:     var(--flexoki-cyan-950);
}
```

---

## 3. The base layout

```css
html {
  box-sizing: border-box;
  font-size: 62.5%;            /* 1rem = 10px */
  width: 100%; height: 100%;
}
*, *::before, *::after { box-sizing: inherit; }

body {
  color-scheme: light dark;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  background-color: var(--color-bg-primary);
  color: var(--color-tx-normal);
  font-family: var(--font-content);
  line-height: var(--line-height);

  margin: 2vw auto 0 auto;     /* top breathing room that scales w/ viewport */
  padding: 2rem 0 24rem;       /* HUGE bottom padding — gives articles "end-of-book" air */
  overflow-x: hidden;

  font-size: 1.8rem;                    /* fallback */
  font-size: calc(1.5rem + .25vw);      /* fluid */
}

article, heading, nav, footer {
  display: block;
  max-width: var(--wrap-wide);
  width: var(--wrap-normal);
  margin-left: auto;
  margin-right: auto;
}

p { max-width: var(--wrap-normal); }
```

The trick on `article`: `width` is the *narrow* measure but `max-width` is the *wide* one. Children that opt into `.wide` can break out up to `--wrap-wide` without the article itself changing.

```css
article .wide {
  padding: 1.5em 0;
  max-width: min(100vw, var(--wrap-wide));
  width:     min(100vw, var(--wrap-wide));
  margin-left: calc((min(100vw, var(--wrap-wide)) - 100%) / -2);
}
```

That negative-margin formula pulls a wide child outward, centered on the narrow column — the classic "full-bleed image inside a text column" pattern.

---

## 4. Typography

```css
h1, h2, h3, h4, h5, h6 {
  line-height: 1.3;
  margin-bottom: 0;
  padding-bottom: 0;
  position: relative;
}

h1 {
  font-weight: 500;
  font-size: calc(1.35em + .55vw);   /* fluid */
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 1.5em 0 .25em;
}
h2 {
  font-weight: var(--heading-weight);
  font-size: calc(1em + .2vw);
  letter-spacing: -0.015em;
  margin: 1em 0 .5em;
  line-height: 1.3;
}
h3 { font-weight: var(--heading-weight); font-size: 1em; margin: 1em 0 .5em; line-height: 1.3; }
h4 { font-weight: 600; font-size: 1em; margin-top: 1em; line-height: 1.3; }
h5 {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  font-size: 1.4rem;
  margin-bottom: 1em;
}

article h2            { margin-top: 2em; }        /* extra air for section breaks */
article h1 + h2,
article h2 + h3       { margin-top: 1em; }        /* collapse when stacked */
article h3            { margin-top: 1.5em; }
```

Things to notice:

- Negative letter-spacing on big headings (`-0.02em` / `-0.015em`). Tiny, but essential for a "typeset" feel.
- Headings are `font-weight: 500` on desktop — *medium*, not bold. The site reads like a magazine, not a blog.
- `h5` is all-caps micro-label with positive tracking. Totally different role.

Body text and inline marks:

```css
small, .small   { font-size: var(--font-small);   line-height: 1.4; }
.smaller        { font-size: var(--font-smaller); line-height: 1.4; }

mark {
  background-color: var(--color-highlight);
  color: var(--color-tx-normal);
}

b, strong { font-weight: 600; }

::selection     { background: var(--color-selection); }
::-moz-selection{ background: var(--color-selection); }
```

---

## 5. Links

```css
a           { color: var(--color-tx-normal); text-decoration: underline; }
a:hover     { color: var(--color-action); border-color: var(--color-action); }
a:focus     { outline: none; background-color: var(--color-bg-hover); }
a.plain,
a.muted     { text-decoration: none; }

/* External-link arrow glyph, inline SVG via background-image */
article a:not(.plain):not(.tag):not(.internal-link):not(.footnote)
       :not(.reversefootnote):not([href^="#"]):not([href^="/"]) {
  background-image: url("data:image/svg+xml,%3Csvg ... arrow SVG ...%3E%3C/svg%3E");
  background-position: right 33%;
  background-repeat: no-repeat;
  background-size: .7em;
  padding-right: .75em;
}
```

The `:not()` chain means: an external link is "any `<a>` inside an article that isn't one of the known internal/utility kinds." Elegant and maintenance-free.

Heading anchor icons (hover-reveal):

```css
h1 .anchor, h2 .anchor, h3 .anchor, h4 .anchor, h5 .anchor, h6 .anchor {
  position: absolute;
  left: -1.5em;
  padding-right: 1em;
  color: transparent;
  background-color: var(--color-tx-faint);
  mask-image: url("data:image/svg+xml,... chain icon ...");
  mask-size: .75em;
  mask-repeat: no-repeat;
  mask-position: center;
  opacity: 0;
  transition: opacity .1s ease-in-out;
  user-select: none;
}
h1:hover .anchor, h2:hover .anchor, /* ... */ {
  opacity: 1;
  transition: opacity 0s ease-in-out .25s;   /* delayed reveal */
}
```

The "tinted mask" technique: the SVG is used as a mask, and the element's `background-color` is the actual visible color. Means you can recolor the icon per-theme with nothing but a CSS variable.

---

## 6. Spacing utilities (the rhythm system)

Every margin/padding is either `1rem`, `2rem`, `4rem`, `6rem`, or `8rem`. The utilities:

```
.pa /.pt/.pr/.pb/.pl  → padding: 1rem  (all/top/right/bottom/left)
.ppa/.ppt/.ppr/.ppb/.ppl → padding: 2rem
.pn1..pn4  → padding-top: 2rem..8rem
.ps1..ps4  → padding-bottom: 2rem..8rem

.st/.sr/.sb/.sl      → margin 1rem
.sst/.ssr/.ssb/.ssl  → margin 2rem
.mn1..mn4            → margin-top: 2rem..8rem
.ms1..ms4            → margin-bottom: 2rem..8rem

.gap1                → gap: 1rem
.cc                  → margin auto (center block)
.l/.r/.c             → text-align left/right/center
.ba/.bt/.br/.bb/.bl  → 1px ui border on that side
.ra                  → border-radius: var(--border-radius); overflow: hidden
```

And color utilities: `.bg`, `.bg-2`, `.bg-tx`, `.bg-ui`, `.bg-ui-2`, `.bg-ui-3`, plus per-accent `.bg-re/.bg-or/.bg-ye/.bg-gr/.bg-cy/.bg-bl/.bg-pu/.bg-ma` (+ `-2` hover variants). Note the two-letter abbreviations — red/orange/yellow/green/cyan/blue/purple/magenta. Terse on purpose.

This is a deliberately tiny utility set. You don't need Tailwind to get this vibe.

---

## 7. Code blocks, tables, forms, tags

```css
code, kbd {
  font-family: var(--font-mono);
  background: var(--color-bg-secondary);
  padding: .1em .2em;
  border-radius: 4px;
  font-size: 90%;
}
kbd { font-weight: 600; border: 1px solid var(--color-ui-hover); }

pre {
  font-family: var(--font-mono);
  border: 1px solid var(--color-ui-normal);
  border-radius: 4px;
  padding: 1em;
  font-size: 90%;
  white-space: pre-wrap;
}
pre code { background: transparent; }
```

Syntax highlighting uses the Flexoki accents on Pygments-style `.highlight .k/.s/.m/...` classes — clone the block from `styles.pretty.css` lines 726–829 if you want the exact mapping.

```css
table {
  margin: 1.5em 0 2.5em;
  width: 100%;
  border-collapse: collapse;
  font-size: 90%;
  font-variant-numeric: tabular-nums;
}
tr  { border-bottom: 1px solid var(--color-ui-normal); }
td  { padding: .5em 1em .5em 0; line-height: 1.3; }
th  { text-align: left; font-weight: 600; padding-bottom: .5em; }
```

Forms (note the "underline only" input style — no borders/boxes):

```css
input[type=text], input[type=email], input[type=password], textarea {
  background: transparent;
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-ui-normal);
  border-radius: 0;
  margin-bottom: 1.5em;
  padding: .5em 0;
  width: var(--input-width);
}
input:focus { border-bottom-color: var(--color-action); outline: none; }

input[type=submit], button {
  -webkit-appearance: none;
  background: var(--color-tx-normal);
  color: var(--color-bg-primary);
  border: 1px solid var(--color-tx-normal);
  border-radius: 3px;
  padding: .5em 1em;
  font-weight: 400;
}
input[type=submit]:hover, button:hover {
  background: var(--color-action);
  border-color: var(--color-action);
  cursor: pointer;
}
```

Pill-shaped tags:

```css
.tag {
  border: 1px solid var(--color-ui-normal);
  padding: .1em .5em .15em;
  border-radius: 1em;
  font-size: var(--font-smaller);
  color: var(--color-tx-muted);
  line-height: 2;
  text-decoration: none;
}
```

Blockquotes are dead simple:

```css
blockquote {
  padding-left: 1.5em;
  margin: 1.5em 0;
  border-left: 2px solid var(--color-tx-normal);
}
blockquote p { margin: 0; }
```

Horizontal rules inside articles are replaced with a centered `•••`:

```css
article hr {
  margin: calc(2em + 2vh) 0;
  border: 0;
  background: none;
  text-align: center;
  display: block;
  overflow: visible;
}
article hr::before {
  content: "•••";
  display: inline-block;
  font-size: calc(.8em + .2vw);
  margin-left: .6em;
  letter-spacing: 1.25em;
  color: var(--color-tx-faint);
  position: relative;
  top: -.75em;
}
```

Backlinks grid:

```css
.backlinks {
  display: grid;
  gap: .5em;
  grid-template-columns: repeat(2, 1fr);
}
.backlink {
  border: 1px solid var(--color-ui-normal);
  border-radius: var(--border-radius);
  padding: .75em;
  line-height: 1.3;
}
.backlink:hover { border-color: var(--color-ui-hover); }
@media (max-width: 600px) {
  .backlinks { grid-template-columns: 1fr; }
}
```

---

## 8. Dark mode

Two things power the whole dark mode:

1. CSS variables — every color used in a rule is a `--color-*` semantic token.
2. A `.theme-dark` class on `<body>` that redefines those tokens.

That's it. No `prefers-color-scheme` magic required; the page uses a JS toggle (`#theme-toggle`) that flips the class. Add `prefers-color-scheme: dark` support by duplicating the `.theme-dark` block inside `@media (prefers-color-scheme: dark) { :root { ... } }` if you want OS-matching by default.

The toggle itself is a 36×20 pill with an SVG-masked circle that slides via `left: 1px → 16px`:

```css
#theme-toggle         { width: 36px; height: 20px; position: relative; border: none; cursor: pointer; }
.theme-toggle-slide   { position: absolute; width: 100%; height: 20px;
                        border: 1px solid var(--color-ui-normal); border-radius: 24px; }
.theme-toggle-switch  { position: absolute; top: 1px; left: 1px; width: 18px; height: 18px;
                        background-color: var(--color-tx-muted);
                        -webkit-mask-image: url("data:image/svg+xml, ... sun svg ...");
                        -webkit-mask-size: 18px;
                        transition: left .1s linear; }
.theme-dark .theme-toggle-switch { left: 16px;
                                    -webkit-mask-image: url("... moon svg ..."); }
```

---

## 9. Responsive behavior

There are really only three breakpoints:

- `@media (max-width: 860px)` — collapses the wrap widths to viewport units, bumps `--heading-weight` to 600.
- `@media (max-width: 54em)`  — removes border radius on `.wide` children.
- `@media (max-width: 600px)` — single-column backlinks, tighter list padding, `.mh` hidden on mobile.
- `@media (min-width: 600px)` — `.dkh` hidden on desktop (inverse).

`.mh` ("mobile hide") and `.dkh` ("desktop hide") are the only show/hide utilities. Everything else responds via the fluid `calc()` type and the `vw`-based wraps.

---

## 10. Minimal HTML skeleton

Here's a starter that matches the system:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Site</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="theme-light">
  <nav>
    <a href="/" class="plain"><strong>Your Name</strong></a>
    · <a href="/notes">Notes</a>
    · <a href="/about">About</a>
    <button id="theme-toggle" aria-label="Toggle theme">
      <span class="theme-toggle-slide"></span>
      <span class="theme-toggle-switch"></span>
    </button>
  </nav>

  <article>
    <h1>A title that breathes</h1>
    <p class="muted small">April 14, 2026</p>

    <p>Body copy sits in the 37em column. Read comfortably.</p>

    <h2>A section</h2>
    <p>More prose. Links to <a href="https://example.com">something external</a>
       automatically get an arrow.</p>

    <figure class="wide">
      <img src="/img/thing.jpg" alt="">
      <figcaption>A caption in muted tone.</figcaption>
    </figure>

    <blockquote><p>A quotation, flush-left with a thin rule.</p></blockquote>

    <hr>

    <h3>Backlinks</h3>
    <div class="backlinks">
      <a class="backlink" href="/a">A related note</a>
      <a class="backlink" href="/b">Another related note</a>
    </div>
  </article>

  <footer class="muted small">
    © 2026 Your Name
  </footer>

  <script>
    // minimal theme toggle
    const body = document.body;
    const saved = localStorage.getItem('theme');
    if (saved) body.className = saved;
    document.getElementById('theme-toggle').addEventListener('click', () => {
      const next = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
      body.className = next;
      localStorage.setItem('theme', next);
    });
  </script>
</body>
</html>
```

---

## 11. How to replicate (practical steps)

1. **Start with the tokens.** Copy the `:root` variables (typography, layout, raw Flexoki, semantic). Without these, nothing else works.
2. **Set `html { font-size: 62.5% }` and the fluid body rule.** This is the single biggest reason the site feels tuned.
3. **Define the wrap pattern.** `article { width: --wrap-normal; max-width: --wrap-wide; margin: auto }` plus the `.wide` breakout formula.
4. **Add headings.** Pay attention to `--heading-weight: 500`, negative letter-spacing, and the `article h2 { margin-top: 2em }` rhythm.
5. **Links + selection color + mark.** These small details do a lot of the "magazine" feel.
6. **Spacing utilities.** Add just the ones you'll actually use (`.ms1..ms4`, `.pa`, `.cc`).
7. **Dark mode.** Add `.theme-dark` block and a 20-line JS toggle.
8. **Optional flourishes:** external-link arrow, heading anchor icons, `•••` HR, backlinks grid. These are the "masterpiece" touches — each is ~10 lines.

Skip anything you don't need. The power of this stylesheet is how little of it is load-bearing — maybe 200 lines cover 80% of the look.

---

## 12. Credits

- **Flexoki** color palette — MIT licensed — https://github.com/kepano/flexoki
- **normalize.css** — MIT licensed — https://github.com/necolas/normalize.css
- **Steph Ango** — the design decisions, the restraint, the taste. https://stephango.com
