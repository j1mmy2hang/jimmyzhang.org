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
  connections: Record<string, Connection[]>;
  resolve: Record<string, Resolved>;
};

export type NoteMetaIndex = Pick<NoteIndex, 'atomic' | 'book' | 'clipping'>;

let cached: Promise<NoteIndex> | null = null;
let cachedMeta: Promise<NoteMetaIndex> | null = null;

export function loadNoteIndex(): Promise<NoteIndex> {
  if (!cached) {
    cached = import('./generated/note-index.json').then(
      (m) => (m.default || m) as unknown as NoteIndex
    );
  }
  return cached;
}

/** Loads only atomic/book/clipping metadata (~290 KB vs ~2 MB full index).
 *  Use this for list and wheel pages that don't do wikilink resolution. */
export function loadNoteMetaIndex(): Promise<NoteMetaIndex> {
  if (!cachedMeta) {
    cachedMeta = import('./generated/note-meta.json').then(
      (m) => (m.default || m) as unknown as NoteMetaIndex
    );
  }
  return cachedMeta;
}
