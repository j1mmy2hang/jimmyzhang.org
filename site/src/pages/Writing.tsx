import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { loadWritingIndex, type WritingMeta } from '../siteIndex';
import '../styles/page.css';
import '../styles/writing-index.css';

function formatDate(s: string): string {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function sortByPublished(a: WritingMeta, b: WritingMeta): number {
  if (!a.published) return 1;
  if (!b.published) return -1;
  return b.published.localeCompare(a.published);
}

export default function Writing() {
  const [posts, setPosts] = useState<WritingMeta[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadWritingIndex().then((list) => {
      if (cancelled) return;
      setPosts(list.filter((p) => p.slug !== 'index').sort(sortByPublished));
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <main>
      <Breadcrumb section="writing" />
      <article>
        <header className="page-header">
          <h1 className="page-title">Writing</h1>
        </header>
        {posts && (
          <ul className="writing-list">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link to={`/writing/${p.slug}`} className="writing-row">
                  <span className="writing-row-title">{p.title || p.slug}</span>
                  <span className="writing-row-dots" aria-hidden="true" />
                  <span className="writing-row-date">{formatDate(p.published || '')}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </article>
      <SubscribeForm />
    </main>
  );
}
