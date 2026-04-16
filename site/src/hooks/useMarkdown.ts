import { useEffect, useState } from 'react';
import { marked } from '../markdown';
import { loadNoteIndex } from '../noteIndex';
import { preprocessNoteBody } from '../noteMarkdown';

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

export function useMarkdown(path: string): State {
  const [state, setState] = useState<State>({
    loading: true,
    error: null,
    html: '',
    frontmatter: {},
  });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, error: null, html: '', frontmatter: {} });
    const isNote = NOTE_PATH.test(path);
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        const { frontmatter, body } = parseFrontmatter(text);
        if (!isNote) {
          const html = marked.parse(body, { async: false }) as string;
          setState({ loading: false, error: null, html, frontmatter });
          return;
        }
        return loadNoteIndex().then((index) => {
          if (cancelled) return;
          const processed = preprocessNoteBody(body, index);
          const html = marked.parse(processed, { async: false }) as string;
          setState({ loading: false, error: null, html, frontmatter });
        });
      })
      .catch((e) => {
        if (cancelled) return;
        setState({ loading: false, error: String(e), html: '', frontmatter: {} });
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}
