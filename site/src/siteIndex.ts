// Public, fetch-loaded indexes for list pages. These live in /generated/ on
// the deployed origin (built by scripts/build-note-index.mjs into
// content/generated/) so the browser parses them as native JSON instead of
// loading them as JS chunks bundled by Vite.
//
// Each loader caches the in-flight promise so repeat calls share one fetch.
// The cache is dropped on rejection — without that, a single transient failure
// would permanently break the page.
import type { BookMeta, ClippingMeta } from './noteIndex';

export type WritingMeta = { slug: string; title?: string; published?: string };
export type ProjectMeta = {
  slug: string;
  title?: string;
  description?: string;
  website?: string;
  image?: string;
  finished?: string;
  status?: string;
};
export type NewsletterMeta = {
  slug: string;
  title?: string;
  created?: string;
  cover?: string;
};
export type PhotoMeta = {
  slug: string;
  title: string;
  date: string;
  location: string;
  cover: string | null;
};

const cache = new Map<string, Promise<unknown>>();

function load<T>(path: string): Promise<T> {
  const existing = cache.get(path) as Promise<T> | undefined;
  if (existing) return existing;
  const p = fetch(path).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json() as Promise<T>;
  });
  p.catch(() => { if (cache.get(path) === p) cache.delete(path); });
  cache.set(path, p as Promise<unknown>);
  return p;
}

export const loadWritingIndex = () =>
  load<WritingMeta[]>('/generated/writing-index.json');
export const loadProjectIndex = () =>
  load<ProjectMeta[]>('/generated/project-index.json');
export const loadNewsletterIndex = () =>
  load<NewsletterMeta[]>('/generated/newsletter-index.json');
export const loadPhotoIndex = () =>
  load<PhotoMeta[]>('/generated/photo-index.json');
export const loadBookMeta = () =>
  load<Record<string, BookMeta>>('/generated/book-meta.json');
export const loadClippingMeta = () =>
  load<Record<string, ClippingMeta>>('/generated/clipping-meta.json');
