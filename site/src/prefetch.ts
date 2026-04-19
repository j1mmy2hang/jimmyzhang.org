// On-hover / on-focus prefetch for internal content.
//
// When a visitor hovers or focuses an internal link to a markdown-backed
// page, we warm the browser's HTTP cache with the corresponding `.md` file.
// By the time they click, the bytes are usually already local — the nav
// feels instant without us introducing a router cache or custom fetcher.
//
// The note index itself is also warmed on the first internal hover, so the
// very first note click doesn't pay for it.

import { loadNoteIndex } from './noteIndex';

const warmed = new Set<string>();

// Route prefixes whose URLs map 1:1 to a markdown file on the same path
// (e.g. `/writing/foo` → `/writing/foo.md`). `/note/<type>/<slug>` follows
// the same rule.
const MD_PREFIXES = ['/note/', '/writing/', '/project/', '/newsletter/', '/photo/'];

function mdUrlFor(href: string): string | null {
  if (!MD_PREFIXES.some((p) => href.startsWith(p))) return null;
  const rest = href.split(/[?#]/)[0];
  const parts = rest.split('/').filter(Boolean);
  // /writing, /note, etc. — these are index routes, no md to warm.
  if (parts.length < 2) return null;
  // /note/atomic (type index) has no slug.
  if (rest.startsWith('/note/') && parts.length < 3) return null;
  return `${rest}.md`;
}

function warm(url: string): void {
  if (warmed.has(url)) return;
  warmed.add(url);
  // `fetch` with default priority is enough — the response lands in the
  // HTTP cache and the next real fetch reads it for free.
  fetch(url, { credentials: 'same-origin' }).catch(() => {
    // Prefetch is best-effort. If it fails, the real navigation will just
    // fetch it again.
    warmed.delete(url);
  });
}

let indexWarmed = false;
function warmNoteIndex(): void {
  if (indexWarmed) return;
  indexWarmed = true;
  // Triggers the dynamic JSON import inside loadNoteIndex; the module-level
  // cache means the real NotePage fetch reuses this promise.
  loadNoteIndex().catch(() => {
    indexWarmed = false;
  });
}

function handle(e: Event): void {
  const target = e.target as Element | null;
  if (!target) return;
  const a = target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || !href.startsWith('/')) return;
  const md = mdUrlFor(href);
  if (!md) return;
  warm(md);
  if (href.startsWith('/note/')) warmNoteIndex();
}

export function installPrefetch(): void {
  if (typeof window === 'undefined') return;
  // `pointerenter` would be cleaner but doesn't bubble; `mouseover` does and
  // fires once per element entry after dedup via `warmed`.
  window.addEventListener('mouseover', handle, { passive: true });
  window.addEventListener('focusin', handle, { passive: true });
  window.addEventListener(
    'touchstart',
    handle,
    { passive: true, capture: true }
  );
}
