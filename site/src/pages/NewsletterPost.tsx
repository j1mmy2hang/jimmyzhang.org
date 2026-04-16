import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { useMarkdown } from '../hooks/useMarkdown';
import '../styles/page.css';
import '../styles/newsletter-post.css';

function formatLongDate(s: string): string {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function NewsletterPost() {
  const { slug } = useParams<{ slug: string }>();
  const { html, loading, error, frontmatter } = useMarkdown(`/newsletter/${slug}.md`);
  const title = frontmatter.title || '';
  const created = frontmatter.created || '';

  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/.netlify/functions/like?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => setLikes(data.likes))
      .catch(() => {});
  }, [slug]);

  async function handleLike() {
    if (liked || !slug) return;
    try {
      const res = await fetch('/.netlify/functions/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (res.ok) {
        setLikes(data.likes);
        setLiked(true);
      }
    } catch {}
  }

  if (!slug) return null;

  return (
    <main>
      <Breadcrumb section="newsletter" />
      <article>
        <header className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          {created && <p className="page-subtitle">{formatLongDate(created)}</p>}
        </header>
        <div className="prose">
          {loading && <p className="page-status">loading...</p>}
          {error && <p className="page-status">could not load newsletter</p>}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
        {html && (
          <div className="newsletter-actions">
            <button
              className={`newsletter-like ${liked ? 'newsletter-like--liked' : ''}`}
              onClick={handleLike}
              disabled={liked}
            >
              {liked ? '♥' : '♡'} {likes !== null ? likes : ''}
            </button>
          </div>
        )}
      </article>
      <SubscribeForm />
    </main>
  );
}
