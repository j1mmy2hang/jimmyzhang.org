import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { useMarkdown } from '../hooks/useMarkdown';
import { useInternalLinkIntercept } from '../useInternalLinkIntercept';
import '../styles/page.css';
import '../styles/photo-page.css';

function formatLongDate(s: string): string {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function rewriteEmbeds(html: string): string {
  return html.replace(/!\[\[([^\]]+)\]\]/g, (_m, name) => {
    const clean = String(name).trim();
    return `<img src="/asset/image/${encodeURIComponent(clean)}" alt="${clean}" loading="lazy" />`;
  });
}

export default function PhotoPage() {
  const { slug } = useParams<{ slug: string }>();
  const { html, loading, error, frontmatter } = useMarkdown(`/photo/${slug}.md`);
  const onProseClick = useInternalLinkIntercept();
  const proseRef = useRef<HTMLDivElement>(null);

  const title = frontmatter.title || '';
  const date = frontmatter.date || '';
  const location = frontmatter.location || '';
  const description = (frontmatter.description || '').trim();
  const finalHtml = rewriteEmbeds(html);

  // Classify each image as landscape / portrait once it loads, so CSS can
  // widen horizontal images while keeping verticals at the normal wrap.
  useEffect(() => {
    const container = proseRef.current;
    if (!container) return;
    const imgs = Array.from(container.querySelectorAll('img'));
    const classify = (img: HTMLImageElement) => {
      if (img.naturalWidth === 0) return;
      img.classList.add(
        img.naturalWidth >= img.naturalHeight ? 'is-landscape' : 'is-portrait'
      );
    };
    imgs.forEach((img) => {
      if (img.complete) classify(img);
      else img.addEventListener('load', () => classify(img), { once: true });
    });
  }, [finalHtml]);

  return (
    <main>
      <Breadcrumb section="photo" />
      <article className="photo-page">
        <header className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          {(date || location) && (
            <p className="page-subtitle">
              {date && formatLongDate(date)}
              {date && location && ' · '}
              {location}
            </p>
          )}
        </header>
        <div className="prose photo-prose" ref={proseRef} onClick={onProseClick}>
          {description && (
            <blockquote className="photo-description">{description}</blockquote>
          )}
          {loading && <p className="page-status">loading…</p>}
          {error && <p className="page-status">could not load /photo/{slug}.md</p>}
          {!loading && !error && <div dangerouslySetInnerHTML={{ __html: finalHtml }} />}
        </div>
      </article>
      <SubscribeForm />
    </main>
  );
}
