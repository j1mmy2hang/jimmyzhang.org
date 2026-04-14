import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import WorldMap, { projectPoint, MAP_WIDTH, MAP_HEIGHT } from '../components/WorldMap';
import { geocode } from './photoLocations';
import '../styles/page.css';
import '../styles/photo-index.css';

const modules = import.meta.glob('../../../content/photo/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

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

function firstEmbed(raw: string): string | null {
  const m = raw.match(/!\[\[([^\]]+)\]\]/);
  return m ? m[1].trim() : null;
}

function formatShortDate(s: string): string {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

type PhotoEntry = {
  slug: string;
  title: string;
  date: string;
  location: string;
  cover: string | null;
  lat: number;
  lng: number;
};

const entries: PhotoEntry[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    if (slug === 'index') return null;
    const fm = parseFrontmatter(raw);
    const geo = geocode(fm.location || '');
    if (!geo) return null;
    return {
      slug,
      title: fm.title || slug,
      date: fm.date || '',
      location: fm.location || '',
      cover: firstEmbed(raw),
      lat: geo.lat,
      lng: geo.lng,
    };
  })
  .filter((e): e is PhotoEntry => e !== null)
  .sort((a, b) => a.date.localeCompare(b.date));

export default function Photo() {
  const [index, setIndex] = useState(entries.length - 1);
  const current = entries[index];

  const pins = useMemo(
    () => entries.map((e) => ({ id: e.slug, lat: e.lat, lng: e.lng })),
    []
  );

  const popupPos = useMemo(() => projectPoint(current.lng, current.lat), [current]);

  const { minTime, span } = useMemo(() => {
    const times = entries.map((e) => new Date(e.date).getTime());
    const min = Math.min(...times);
    const max = Math.max(...times);
    return { minTime: min, span: Math.max(1, max - min) };
  }, []);

  const posFor = (dateStr: string): number => {
    const t = new Date(dateStr).getTime();
    return ((t - minTime) / span) * 100;
  };

  return (
    <main>
      <Breadcrumb section="photo" />
      <article className="photo-index">
        <header className="page-header">
          <h1 className="page-title">Photo</h1>
        </header>
        <div className="photo-map-wrap">
          <WorldMap
            pins={pins}
            activeId={current.slug}
            onPinClick={(id) => {
              const i = entries.findIndex((e) => e.slug === id);
              if (i >= 0) setIndex(i);
            }}
          />
          {popupPos && (
            <div
              className="photo-popup"
              style={{
                left: `${(popupPos[0] / MAP_WIDTH) * 100}%`,
                top: `${(popupPos[1] / MAP_HEIGHT) * 100}%`,
              }}
            >
              {current.cover && (
                <img
                  className="photo-popup-cover"
                  src={`/asset/image/${encodeURIComponent(current.cover)}`}
                  alt=""
                />
              )}
              <div className="photo-popup-body">
                <div className="photo-popup-title">{current.title}</div>
                <div className="photo-popup-meta">
                  {current.location}
                  {current.date && <> · {formatShortDate(current.date)}</>}
                </div>
                <Link className="photo-popup-open" to={`/photo/${current.slug}`}>
                  Open →
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="photo-timeline" role="group" aria-label="Photo timeline">
          <div className="photo-timeline-inner">
            <div className="photo-timeline-line" />
            {entries.map((e, i) => {
              const active = i === index;
              return (
                <button
                  key={e.slug}
                  type="button"
                  className={active ? 'photo-tl-dot active' : 'photo-tl-dot'}
                  style={{ left: `${posFor(e.date)}%` }}
                  onClick={() => setIndex(i)}
                  aria-label={`${e.title} — ${formatShortDate(e.date)}`}
                >
                  {active && (
                    <span className="photo-tl-dot-date">{formatShortDate(e.date)}</span>
                  )}
                </button>
              );
            })}
          </div>
          <svg
            className="photo-timeline-arrow"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M 0 8 L 13 8 M 9 4 L 13 8 L 9 12"
              stroke="currentColor"
              fill="none"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </article>
    </main>
  );
}
