import Breadcrumb from '../components/Breadcrumb';
import { useMarkdown } from '../hooks/useMarkdown';
import '../styles/page.css';

export default function MarkdownPage({
  path,
  section,
}: {
  path: string;
  section: string;
}) {
  const { html, loading, error, frontmatter } = useMarkdown(path);
  const title = frontmatter.title || '';

  return (
    <main className="page">
      <Breadcrumb section={section} />
      {title && <h1 className="page-title">{title}</h1>}

      <article className="prose">
        {loading && <p className="page-status">loading…</p>}
        {error && <p className="page-status">could not load {path}</p>}
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      </article>
    </main>
  );
}
