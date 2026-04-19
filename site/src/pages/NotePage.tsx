import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  loadNoteIndex,
  noteConnection,
  type NoteIndex,
  type NoteType,
  type Connection,
} from '../noteIndex';
import { renderNoteMarkdown } from '../noteMarkdown';
import '../styles/page.css';
import '../styles/note.css';

function formatLongDate(s: string): string {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function parseFrontmatter(raw: string): { fm: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const fm: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([\w-]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].replace(/^["']|["']$/g, '').trim();
  }
  return { fm, body: m[2] };
}

function isWebUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}

function LinkList({ list }: { list: Connection[] }) {
  return (
    <ul className="backlink-list">
      {list.map((c) => (
        <li key={`${c.type}/${c.slug}`}>
          <Link to={`/note/${c.type}/${c.slug}`} className="backlink-item">
            <span className={`backlink-type backlink-type-${c.type}`}>{c.type}</span>
            <span className="backlink-title">{c.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ConnectionBox({ connections }: { connections: Connection[] }) {
  const sources = connections.filter((c) => c.type === 'book' || c.type === 'clipping');
  const backlinks = connections.filter((c) => c.type === 'atomic');
  if (sources.length === 0 && backlinks.length === 0) return null;
  return (
    <aside className="backlink-box">
      {sources.length > 0 && (
        <div className="backlink-section">
          <div className="backlink-header">Source</div>
          <LinkList list={sources} />
        </div>
      )}
      {backlinks.length > 0 && (
        <div className="backlink-section">
          <div className="backlink-header">Backlinks</div>
          <LinkList list={backlinks} />
        </div>
      )}
    </aside>
  );
}

export default function NotePage({ type }: { type: NoteType }) {
  const { slug } = useParams<{ slug: string }>();
  const [index, setIndex] = useState<NoteIndex | null>(null);
  const [raw, setRaw] = useState<string>('');
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setRaw('');
    Promise.all([
      loadNoteIndex(),
      fetch(`/note/${type}/${slug}.md`).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      }),
    ])
      .then(([idx, text]) => {
        if (cancelled) return;
        setIndex(idx);
        setRaw(text);
        setStatus('ok');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [type, slug]);

  const { fm, body } = useMemo(() => parseFrontmatter(raw), [raw]);
  const html = useMemo(
    () => (index && body ? renderNoteMarkdown(body, index) : ''),
    [index, body]
  );

  const title = fm.title || slug || '';
  const date = fm.published || fm.created || '';
  const author = fm.author || '';
  const source = fm.source || '';
  const rating = fm.rating ? Number(fm.rating) : 0;
  const connections: Connection[] = useMemo(() => {
    if (!index || !slug) return [];
    const slugs = index.connections[slug] || [];
    return slugs
      .map((s) => noteConnection(index, s))
      .filter((c): c is Connection => c !== null);
  }, [index, slug]);

  return (
    <main>
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/" className="breadcrumb-home">Jimmy Zhang</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/note" className="breadcrumb-section">note</Link>
        <span className="breadcrumb-sep">/</span>
        {type === 'atomic' ? (
          <span className="breadcrumb-section">atomic</span>
        ) : (
          <Link to={`/note/${type}`} className="breadcrumb-section">{type}</Link>
        )}
      </nav>
      <article>
        <ConnectionBox connections={connections} />
        <header className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          <div className="note-meta">
            {author && <span>{author}</span>}
            {date && <span>{formatLongDate(date)}</span>}
            {rating > 0 && (
              <span className="note-rating" aria-label={`rating ${rating}`}>
                {'★'.repeat(Math.min(rating, 10))}
              </span>
            )}
            {source && isWebUrl(source) && (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="note-source-link"
              >
                source ↗
              </a>
            )}
          </div>
        </header>
        <div className="prose">
          {status === 'loading' && <p className="page-status">loading…</p>}
          {status === 'error' && <p className="page-status">could not load this note</p>}
          {status === 'ok' && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>
    </main>
  );
}
