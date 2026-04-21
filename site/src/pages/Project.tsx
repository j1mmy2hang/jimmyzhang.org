import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SubscribeForm from '../components/SubscribeForm';
import { loadProjectIndex, type ProjectMeta } from '../siteIndex';
import '../styles/page.css';
import '../styles/project-index.css';

type Status = 'active' | 'finished' | 'archive';

type Project = {
  slug: string;
  title: string;
  description: string;
  website: string;
  image: string;
  finished: string;
  status: Status;
};

function stripWikilink(s: string): string {
  const m = s.match(/^\[\[(.+?)\]\]$/);
  return m ? m[1] : s;
}

function normalizeStatus(s: string): Status {
  const v = s.toLowerCase().trim();
  if (v === 'active') return 'active';
  if (v === 'archive') return 'archive';
  return 'finished';
}

function monthYearValue(s: string): number {
  if (!s) return -Infinity;
  const d = new Date(s);
  return isNaN(d.getTime()) ? -Infinity : d.getTime();
}

function normalize(meta: ProjectMeta): Project {
  return {
    slug: meta.slug,
    title: meta.title || meta.slug,
    description: meta.description || '',
    website: meta.website || '',
    image: meta.image ? stripWikilink(meta.image) : '',
    finished: meta.finished || '',
    status: normalizeStatus(meta.status || ''),
  };
}

const SECTIONS: { key: Status; label: string; icon: JSX.Element }[] = [
  {
    key: 'active',
    label: 'Active',
    icon: (
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h4l2-6 4 12 2-6h6" />
      </svg>
    ),
  },
  {
    key: 'finished',
    label: 'Finished',
    icon: (
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  {
    key: 'archive',
    label: 'Archive',
    icon: (
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
];

function groupAndSort(list: Project[], status: Status): Project[] {
  const items = list.filter((p) => p.status === status);
  if (status === 'active') {
    return items.sort((a, b) => a.title.localeCompare(b.title));
  }
  return items.sort((a, b) => monthYearValue(b.finished) - monthYearValue(a.finished));
}

function ProjectCard({ p }: { p: Project }) {
  const hasLink = Boolean(p.website);
  const imgSrc = p.image ? `/asset/image/${encodeURIComponent(p.image)}` : '';

  const inner = (
    <>
      <div className="project-card-text">
        <h3 className="project-card-title">{p.title}</h3>
        {p.description && <p className="project-card-desc">{p.description}</p>}
      </div>
      {p.finished && <span className="project-card-date">{p.finished}</span>}
      {imgSrc && (
        <img
          className="project-card-thumb"
          src={imgSrc}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (hasLink) {
    return (
      <a
        className="project-card has-link"
        href={p.website}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  return <div className="project-card">{inner}</div>;
}

export default function Project() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadProjectIndex().then((list) => {
      if (cancelled) return;
      setProjects(list.filter((p) => p.slug !== 'index').map(normalize));
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <main>
      <Breadcrumb section="project" />
      <article className="project-page">
        <header className="page-header">
          <h1 className="page-title">Project</h1>
        </header>
        {projects && (
          <div className="project-sections">
            {SECTIONS.map(({ key, label, icon }) => {
              const items = groupAndSort(projects, key);
              if (items.length === 0) return null;
              return (
                <section key={key} className="project-section">
                  <div className="project-section-label">
                    <span className={`project-section-icon icon-${key}`}>{icon}</span>
                    <span>{label}</span>
                  </div>
                  <div className="project-cards">
                    {items.map((p) => (
                      <ProjectCard key={p.slug} p={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </article>
      <SubscribeForm />
    </main>
  );
}
