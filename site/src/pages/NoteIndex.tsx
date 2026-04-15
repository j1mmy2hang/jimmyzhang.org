import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/page.css';
import '../styles/note.css';

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 7h18a6 6 0 0 1 6 6v28" />
      <path d="M40 7H22a6 6 0 0 0-6 6v28" />
      <path d="M8 7v30a4 4 0 0 0 4 4h28" />
      <path d="M40 7v30a4 4 0 0 1-4 4H12" />
    </svg>
  );
}

function ClippingIcon() {
  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 6h20l10 10v26a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <path d="M30 6v10h10" />
      <path d="M15 24h18" />
      <path d="M15 31h18" />
      <path d="M15 38h12" />
    </svg>
  );
}

export default function NoteIndex() {
  return (
    <main>
      <Breadcrumb section="note" />
      <article>
        <header className="page-header">
          <h1 className="page-title">Note</h1>
          <p className="page-subtitle">Welcome to Jimmy's Library</p>
        </header>
        <div className="note-entries">
          <Link to="/note/book" className="note-entry">
            <div className="note-entry-icon"><BookIcon /></div>
            <div className="note-entry-name">Book</div>
            <div className="note-entry-desc">
              Books I've read and lessons learned.
            </div>
          </Link>
          <Link to="/note/clipping" className="note-entry">
            <div className="note-entry-icon"><ClippingIcon /></div>
            <div className="note-entry-name">Clipping</div>
            <div className="note-entry-desc">
              My collection of articles, videos, etc. from the internet.
            </div>
          </Link>
        </div>
      </article>
    </main>
  );
}
