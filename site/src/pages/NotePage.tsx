import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInternalLinkIntercept } from '../useInternalLinkIntercept';
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

// A committed snapshot of everything needed to render a note. The URL
// (useParams) changes the instant a link is clicked; `displayed` only
// advances once the next note's index + markdown have both loaded. That way
// breadcrumb, title, backlinks, and body all swap in a single frame — no
// out-of-sync transitions where backlinks update ahead of the body.
type Displayed = {
  type: NoteType;
  slug: string;
  index: NoteIndex;
  raw: string;
};

export default function NotePage({ type }: { type: NoteType }) {
  const { slug } = useParams<{ slug: string }>();
  const handleProseClick = useInternalLinkIntercept();
  const [displayed, setDisplayed] = useState<Displayed | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    Promise.all([
      loadNoteIndex(),
      fetch(`/note/${type}/${slug}.md`, { signal: controller.signal }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      }),
    ])
      .then(([idx, text]) => {
        if (controller.signal.aborted) return;
        setError(false);
        setDisplayed({ type, slug, index: idx, raw: text });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setError(true);
      });
    return () => controller.abort();
  }, [type, slug]);

  const { fm, body } = useMemo(
    () => (displayed ? parseFrontmatter(displayed.raw) : { fm: {}, body: '' }),
    [displayed]
  );
  const html = useMemo(
    () => (displayed && body ? renderNoteMarkdown(body, displayed.index) : ''),
    [displayed, body]
  );

  const title = fm.title || displayed?.slug || '';
  const date = fm.published || fm.created || '';
  const author = fm.author || '';
  const source = fm.source || '';
  const rating = fm.rating ? Number(fm.rating) : 0;
  const connections: Connection[] = useMemo(() => {
    if (!displayed) return [];
    const slugs = displayed.index.connections[displayed.slug] || [];
    return slugs
      .map((s) => noteConnection(displayed.index, s))
      .filter((c): c is Connection => c !== null);
  }, [displayed]);

  // Breadcrumb's `type` comes from the committed snapshot if we have one, so
  // the crumb stays in sync with the rendered body during transitions.
  const crumbType = displayed?.type ?? type;

  // Scroll to the top the moment new content actually commits, not on URL
  // change — otherwise the outgoing note visibly scrolls up before swapping.
  useLayoutEffect(() => {
    if (displayed) window.scrollTo(0, 0);
  }, [displayed]);

  return (
    <main>
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/" className="breadcrumb-home">Jimmy Zhang</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/note" className="breadcrumb-section">note</Link>
        <span className="breadcrumb-sep">/</span>
        {crumbType === 'atomic' ? (
          <span className="breadcrumb-section">atomic</span>
        ) : (
          <Link to={`/note/${crumbType}`} className="breadcrumb-section">{crumbType}</Link>
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
        <div className="prose" onClick={handleProseClick}>
          {error && <p className="page-status">could not load this note</p>}
          {!error && !displayed && <p className="page-status">loading…</p>}
          {!error && displayed && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>
    </main>
  );
}
