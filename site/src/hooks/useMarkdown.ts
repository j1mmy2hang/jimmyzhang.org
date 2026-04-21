import { useEffect, useState } from 'react';
import { marked } from '../markdown';
import { loadNoteIndex, type NoteIndex } from '../noteIndex';
import { preprocessNoteBody, preprocessPageBody } from '../noteMarkdown';

export type Frontmatter = Record<string, string>;

type State = {
  loading: boolean;
  error: string | null;
  html: string;
  frontmatter: Frontmatter;
};

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: raw };
  const fm: Frontmatter = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
  return { frontmatter: fm, body: match[2] };
}

const NOTE_PATH = /^\/note\//;
// Matches `[[...` only when not preceded by `!` — i.e. a real wikilink, not an
// `![[image]]` embed. The preprocess functions only touch the note index from
// inside their `[[...]]` regex callback, so a body without these can render
// without loading the 1.2 MB index at all.
const WIKILINK_RE = /(?<!!)\[\[/;
const EMPTY_INDEX: NoteIndex = {
  atomic: {}, book: {}, clipping: {}, writing: {}, project: {},
  connections: {}, resolve: {},
};

export function useMarkdown(path: string): State {
  const [state, setState] = useState<State>({
    loading: true,
    error: null,
    html: '',
    frontmatter: {},
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, error: null, html: '', frontmatter: {} });
    const isNote = NOTE_PATH.test(path);
    fetch(path, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (controller.signal.aborted) return;
        const { frontmatter, body } = parseFrontmatter(text);
        const preprocess = isNote ? preprocessNoteBody : preprocessPageBody;
        const indexPromise = WIKILINK_RE.test(body)
          ? loadNoteIndex()
          : Promise.resolve(EMPTY_INDEX);
        return indexPromise.then((index) => {
          if (controller.signal.aborted) return;
          const html = marked.parse(preprocess(body, index), { async: false }) as string;
          setState({ loading: false, error: null, html, frontmatter });
        });
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        setState({ loading: false, error: String(e), html: '', frontmatter: {} });
      });
    return () => controller.abort();
  }, [path]);

  return state;
}
