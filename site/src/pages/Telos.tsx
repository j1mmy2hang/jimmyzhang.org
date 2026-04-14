import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useMarkdown } from '../hooks/useMarkdown';
import '../styles/page.css';

export default function Telos() {
  const { html, loading, error, frontmatter } = useMarkdown('/telos/telos-core.md');
  const title = frontmatter.title || 'Telos Core';

  return (
    <main>
      <Breadcrumb section="telos" />
      <article>
        <h1 className="page-title">{title}</h1>
        <div className="prose">
          {loading && <p className="page-status">loading…</p>}
          {error && <p className="page-status">could not load telos-core.md</p>}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>

      <nav className="page-deeper" aria-label="deeper">
        <Link to="/telos/key-beliefs" className="page-deeper-link">
          /telos/key-beliefs
        </Link>
        <Link to="/telos/measure-of-vitality" className="page-deeper-link">
          /telos/measure-of-vitality
        </Link>
        <Link to="/telos/academic-inquiry" className="page-deeper-link">
          /telos/academic-inquiry
        </Link>
      </nav>
    </main>
  );
}
