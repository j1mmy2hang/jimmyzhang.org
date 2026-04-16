import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { useMarkdown } from '../hooks/useMarkdown';
import '../styles/page.css';

export default function Self() {
  const { html, loading, error, frontmatter } = useMarkdown('/self/basics.md');
  const title = frontmatter.title || 'Basics';

  return (
    <main>
      <Breadcrumb section="self" />
      <article>
        <header className="page-header">
          <h1 className="page-title">{title}</h1>
        </header>
        <div className="prose">
          {loading && <p className="page-status">loading…</p>}
          {error && <p className="page-status">could not load basics.md</p>}
          {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
      </article>

      <nav className="page-deeper" aria-label="deeper">
        <Link to="/self/skills" className="page-deeper-link">
          /self/skills
        </Link>
        <Link to="/self/self-portrait" className="page-deeper-link">
          /self/self-portrait
        </Link>
        <Link to="/self/personal-statement" className="page-deeper-link">
          /self/personal-statement
        </Link>
      </nav>
    </main>
  );
}
