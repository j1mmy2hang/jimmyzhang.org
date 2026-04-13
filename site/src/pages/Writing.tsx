import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/page.css';
import '../styles/writing-index.css';

const modules = import.meta.glob('../../../content/writing/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

type Post = { slug: string; title: string; published: string };

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

const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const fm = parseFrontmatter(raw);
    return { slug, title: fm.title || slug, published: fm.published || '' };
  })
  .filter((p) => p.slug !== 'index')
  .sort((a, b) => {
    if (!a.published) return 1;
    if (!b.published) return -1;
    return b.published.localeCompare(a.published);
  });

export default function Writing() {
  return (
    <main className="page">
      <Breadcrumb section="writing" />
      <h1 className="page-title">Writing</h1>
      <ul className="writing-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link to={`/writing/${p.slug}`} className="writing-row">
              <span className="writing-row-title">{p.title}</span>
              <span className="writing-row-dots" aria-hidden="true" />
              <span className="writing-row-date">{formatDate(p.published)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
