import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import '../styles/page.css';
import '../styles/writing-index.css';

const modules = import.meta.glob('../../../content/newsletter/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

type Issue = { slug: string; title: string; created: string };

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  });
  return fm;
}

function formatDate(s: string): string {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

const issues: Issue[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const fm = parseFrontmatter(raw);
    return { slug, title: fm.title || slug, created: fm.created || '' };
  })
  .sort((a, b) => {
    if (!a.created) return 1;
    if (!b.created) return -1;
    return b.created.localeCompare(a.created);
  });

export default function Newsletter() {
  return (
    <main>
      <Breadcrumb section="newsletter" />
      <article>
        <header className="page-header">
          <h1 className="page-title">Newsletter</h1>
        </header>
        {issues.length > 0 ? (
          <ul className="writing-list">
            {issues.map((issue) => (
              <li key={issue.slug}>
                <Link to={`/newsletter/${issue.slug}`} className="writing-row">
                  <span className="writing-row-title">{issue.title}</span>
                  <span className="writing-row-dots" aria-hidden="true" />
                  <span className="writing-row-date">{formatDate(issue.created)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="prose">
            <p>The first issue is coming soon.</p>
          </div>
        )}
      </article>
      <SubscribeForm />
    </main>
  );
}
