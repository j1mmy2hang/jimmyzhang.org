export type NoteType = 'atomic' | 'book' | 'clipping';
export type SiteContentType = NoteType | 'writing' | 'project';

export type Resolved = { type: SiteContentType; slug: string; title: string };

export function resolvedUrl(r: Resolved): string {
  if (r.type === 'writing') return `/writing/${r.slug}`;
  if (r.type === 'project') return `/project/${r.slug}`;
  return `/note/${r.type}/${r.slug}`;
}

export type AtomicMeta = { title: string; date: string };
export type BookMeta = { title: string; date: string; author: string; cover: string };
export type ClippingMeta = {
  title: string;
  date: string;
  source: string;
  rating: number;
};

export type Connection = { type: NoteType; slug: string; title: string };

export type NoteIndex = {
  atomic: Record<string, AtomicMeta>;
  book: Record<string, BookMeta>;
  clipping: Record<string, ClippingMeta>;
  writing: Record<string, string>;
  project: Record<string, string>;
  // slug → connected note slugs (undirected). Only note-type targets are
  // stored; display derives type/title from the meta maps.
  connections: Record<string, string[]>;
  // lowercase key (slug or title) → [type, slug]. Titles live in the meta
  // maps, not here, so the table stays lean.
  resolve: Record<string, [SiteContentType, string]>;
};

function titleFor(index: NoteIndex, type: SiteContentType, slug: string): string {
  if (type === 'atomic') return index.atomic[slug]?.title ?? slug;
  if (type === 'book') return index.book[slug]?.title ?? slug;
  if (type === 'clipping') return index.clipping[slug]?.title ?? slug;
  if (type === 'writing') return index.writing?.[slug] ?? slug;
  if (type === 'project') return index.project?.[slug] ?? slug;
  return slug;
}

export function resolveKey(index: NoteIndex, key: string): Resolved | null {
  const hit = index.resolve[key.toLowerCase()];
  if (!hit) return null;
  const [type, slug] = hit;
  return { type, slug, title: titleFor(index, type, slug) };
}

export function noteConnection(index: NoteIndex, slug: string): Connection | null {
  if (index.atomic[slug]) return { type: 'atomic', slug, title: index.atomic[slug].title };
  if (index.book[slug]) return { type: 'book', slug, title: index.book[slug].title };
  if (index.clipping[slug]) return { type: 'clipping', slug, title: index.clipping[slug].title };
  return null;
}

let cached: Promise<NoteIndex> | null = null;

// Caching the promise (not the resolved value) is intentional: in-flight calls
// share one fetch. But we MUST drop the cache on rejection — otherwise a single
// transient chunk-load failure on the first call permanently poisons every
// subsequent page that needs the index.
export function loadNoteIndex(): Promise<NoteIndex> {
  if (!cached) {
    const p = import('./generated/note-index.json').then(
      (m) => (m.default || m) as unknown as NoteIndex
    );
    p.catch(() => { if (cached === p) cached = null; });
    cached = p;
  }
  return cached;
}
