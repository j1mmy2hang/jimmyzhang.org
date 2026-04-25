import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { loadNewsletterIndex, type NewsletterMeta } from '../siteIndex';
import '../styles/page.css';
import '../styles/newsletter-index.css';

type Issue = { slug: string; title: string; created: string; coverUrl: string | null };

function parseCoverImage(cover: string): string | null {
  const m = cover.match(/^\[\[(.+?)\]\]$/);
  return m ? `/asset/image/${m[1]}` : null;
}

function toIssue(meta: NewsletterMeta): Issue {
  return {
    slug: meta.slug,
    title: meta.title || meta.slug,
    created: meta.created || '',
    coverUrl: meta.cover ? parseCoverImage(meta.cover) : null,
  };
}

function sortByCreated(a: Issue, b: Issue): number {
  if (!a.created) return 1;
  if (!b.created) return -1;
  return b.created.localeCompare(a.created);
}

export default function Newsletter() {
  const [issues, setIssues] = useState<Issue[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadNewsletterIndex().then((list) => {
      if (cancelled) return;
      setIssues(list.map(toIssue).sort(sortByCreated));
    });
    return () => { cancelled = true; };
  }, []);

  const [latest, ...archive] = issues ?? [];

  return (
    <main>
      <Breadcrumb section="newsletter" />
      <article>
        <header className="page-header">
          <h1 className="page-title">Monthly Update</h1>
          <p className="page-subtitle">
            Subscribe for human connection, not product or service.
          </p>
        </header>

        {latest && (
          <Link to={`/newsletter/${latest.slug}`} className="nl-hero">
            {latest.coverUrl && (
              <div className="nl-hero-img-wrap">
                <img src={latest.coverUrl} alt="" className="nl-hero-img" />
              </div>
            )}
          </Link>
        )}

        {archive.length > 0 && (
          <>
            <hr className="nl-divider" />
            <ul className="nl-list">
              {archive.map((issue) => (
                <li key={issue.slug}>
                  <Link to={`/newsletter/${issue.slug}`} className="nl-row">
                    {issue.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
      <SubscribeForm />
    </main>
  );
}
