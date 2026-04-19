import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { useMarkdown } from '../hooks/useMarkdown';
import { useInternalLinkIntercept } from '../useInternalLinkIntercept';
import '../styles/page.css';

function formatLongDate(s: string): string {
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function NewsletterPost() {
  const { slug } = useParams<{ slug: string }>();
  const { html, loading, error, frontmatter } = useMarkdown(`/newsletter/${slug}.md`);
  const onProseClick = useInternalLinkIntercept();
  const title = frontmatter.title || '';
  const created = frontmatter.created || '';

  if (!slug) return null;

  return (
    <main>
      <Breadcrumb section="newsletter" />
      <article>
        <header className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          {created && <p className="page-subtitle">{formatLongDate(created)}</p>}
        </header>
        <div className="prose" onClick={onProseClick}>
          {loading && <p className="page-status">loading...</p>}
          {error && <p className="page-status">could not load newsletter</p>}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>
      <SubscribeForm />
    </main>
  );
}
