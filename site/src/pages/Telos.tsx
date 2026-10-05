import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { useMarkdown } from '../hooks/useMarkdown';
import { useInternalLinkIntercept } from '../useInternalLinkIntercept';
import '../styles/page.css';

export default function Telos() {
  const { html, loading, error, frontmatter } = useMarkdown('/telos/telos-core.md');
  const onProseClick = useInternalLinkIntercept();
  const title = frontmatter.title || 'Telos Core';

  return (
    <main>
      <Breadcrumb section="telos" />
      <article>
        <header className="page-header">
          <h1 className="page-title">{title}</h1>
        </header>
        <div className="prose" onClick={onProseClick}>
          {loading && <p className="page-status">loading…</p>}
          {error && <p className="page-status">could not load telos-core.md</p>}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>

      <SubscribeForm />
    </main>
  );
}
