import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { type BookMeta, loadNoteIndex } from '../noteIndex';
import { loadBookMeta } from '../siteIndex';
import '../styles/page.css';
import '../styles/note.css';

type Entry = BookMeta & { slug: string };

export default function BookShelf() {
  const [books, setBooks] = useState<Entry[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadBookMeta().then((book) => {
      if (cancelled) return;
      const list = Object.entries(book)
        .map(([slug, meta]) => ({ slug, ...meta }))
        .sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return b.date.localeCompare(a.date);
        });
      setBooks(list);
    });
    // Warm the note-index chunk in the background. Anyone landing on the shelf
    // is one click from a book detail page, which needs the full index — by
    // the time they click, it's already in cache.
    loadNoteIndex().catch(() => { /* prefetch is best-effort */ });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      <Breadcrumb section="note" />
      <article className="shelf-page">
        <header className="page-header">
          <h1 className="page-title">Book</h1>
          <p className="page-subtitle">
            {books ? `${books.length} books on the shelf` : ''}
          </p>
        </header>
        <div className="book-shelf">
          {books?.map((b) => (
            <Link
              key={b.slug}
              to={`/note/book/${b.slug}`}
              className="book-card"
              title={b.title}
            >
              <div className="book-cover-wrap">
                <img
                  className="book-cover"
                  src={`/asset/image/${encodeURIComponent(b.cover)}`}
                  alt={b.title}
                  loading="lazy"
                />
              </div>
              <div className="book-card-text">
                <div className="book-card-title">{b.title}</div>
                {b.author && <div className="book-card-author">{b.author}</div>}
              </div>
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
