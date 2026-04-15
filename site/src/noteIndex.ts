export type NoteType = 'atomic' | 'book' | 'clipping';

export type Resolved = { type: NoteType; slug: string; title: string };

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

let cached: Promise<NoteIndex> | null = null;

export function loadNoteIndex(): Promise<NoteIndex> {
  if (!cached) {
    cached = import('./generated/note-index.json').then(
      (m) => (m.default || m) as unknown as NoteIndex
    );
  }
  return cached;
}
