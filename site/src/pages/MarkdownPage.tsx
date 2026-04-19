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

export default function MarkdownPage({
  path,
  section,
}: {
  path: string;
  section: string;
}) {
  const { html, loading, error, frontmatter } = useMarkdown(path);
  const onProseClick = useInternalLinkIntercept();
  const title = frontmatter.title || '';
  const published = frontmatter.published || '';

  return (
    <main>
      <Breadcrumb section={section} />
      <article>
        <header className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          {published && <p className="page-subtitle">{formatLongDate(published)}</p>}
        </header>
        <div className="prose" onClick={onProseClick}>
          {loading && <p className="page-status">loading…</p>}
          {error && <p className="page-status">could not load {path}</p>}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>
      <SubscribeForm />
    </main>
  );
}
