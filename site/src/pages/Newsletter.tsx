import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import '../styles/page.css';
import '../styles/newsletter-index.css';

const modules = import.meta.glob('../../../content/newsletter/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

type Issue = { slug: string; title: string; created: string; coverUrl: string | null };

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

function parseCoverImage(cover: string): string | null {
  const m = cover.match(/^\[\[(.+?)\]\]$/);
  return m ? `/asset/image/${m[1]}` : null;
}

const issues: Issue[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const fm = parseFrontmatter(raw);
    return {
      slug,
      title: fm.title || slug,
      created: fm.created || '',
      coverUrl: fm.cover ? parseCoverImage(fm.cover) : null,
    };
  })
  .sort((a, b) => {
    if (!a.created) return 1;
    if (!b.created) return -1;
    return b.created.localeCompare(a.created);
  });

export default function Newsletter() {
  const [latest, ...archive] = issues;

  return (
    <main>
      <Breadcrumb section="newsletter" />
      <article>
        <header className="page-header">
          <h1 className="page-title">Newsletter</h1>
        </header>

        {latest && (
          <Link to={`/newsletter/${latest.slug}`} className="nl-hero">
            {latest.coverUrl && (
              <div className="nl-hero-img-wrap">
                <img src={latest.coverUrl} alt="" className="nl-hero-img" />
              </div>
            )}
          </Link>
        )}

        {archive.length > 0 && (
          <>
            <hr className="nl-divider" />
            <ul className="nl-list">
              {archive.map((issue) => (
                <li key={issue.slug}>
                  <Link to={`/newsletter/${issue.slug}`} className="nl-row">
                    {issue.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
      <SubscribeForm />
    </main>
  );
}
