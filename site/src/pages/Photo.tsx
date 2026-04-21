import { useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import WorldMap from '../components/WorldMap';
import { geocode } from './photoLocations';
import { loadPhotoIndex, type PhotoMeta } from '../siteIndex';
import '../styles/page.css';
import '../styles/photo-index.css';

function formatShortDate(s: string): string {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

type PhotoEntry = PhotoMeta & { lat: number; lng: number };

function enrich(list: PhotoMeta[]): PhotoEntry[] {
  const out: PhotoEntry[] = [];
  for (const e of list) {
    if (e.slug === 'index') continue;
    const geo = geocode(e.location || '');
    if (!geo) continue;
    out.push({ ...e, lat: geo.lat, lng: geo.lng });
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

export default function Photo() {
  const [entries, setEntries] = useState<PhotoEntry[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadPhotoIndex().then((list) => {
      if (cancelled) return;
      setEntries(enrich(list));
    });
    return () => { cancelled = true; };
  }, []);

  const current = index !== null ? entries[index] : null;

  const pins = useMemo(
    () => entries.map((e) => ({ id: e.slug, lat: e.lat, lng: e.lng })),
    [entries]
  );

  const { minTime, span } = useMemo(() => {
    if (entries.length === 0) return { minTime: 0, span: 1 };
    const times = entries.map((e) => new Date(e.date).getTime());
    const min = Math.min(...times);
    const max = Math.max(...times);
    return { minTime: min, span: Math.max(1, max - min) };
  }, [entries]);

  const posFor = (dateStr: string): number => {
    const t = new Date(dateStr).getTime();
    return ((t - minTime) / span) * 100;
  };

  const timelineRef = useRef<HTMLDivElement>(null);
  const handlePointer = (e: React.PointerEvent) => {
    if (!timelineRef.current || entries.length === 0) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    const time = minTime + percent * span;

    let closestIdx = 0;
    let minDiff = Infinity;
    entries.forEach((entry, i) => {
      const t = new Date(entry.date).getTime();
      const diff = Math.abs(t - time);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    if (closestIdx !== index) {
      setIndex(closestIdx);
    }
  };

  return (
    <main>
      <Breadcrumb section="photo" />
      <article className="photo-index">
        <header className="page-header">
          <h1 className="page-title">Photo</h1>
          <p className="photo-hint">
            Drag on the timeline or navigate the map to view photos
          </p>
        </header>
        {entries.length > 0 && (
          <>
            <div className="photo-map-wrap">
              <WorldMap
                pins={pins}
                activeId={current?.slug ?? null}
                onPinClick={(id) => {
                  const i = entries.findIndex((e) => e.slug === id);
                  if (i >= 0) setIndex(i);
                }}
                onBackgroundClick={() => setIndex(null)}
                renderOverlay={(_, leftPercent, topPercent) => {
                  if (!current) return null;
                  return (
                    <div
                      className="photo-popup"
                      style={{
                        left: `${leftPercent}%`,
                        top: `${topPercent}%`,
                      }}
                    >
                      {current.cover && (
                        <img
                          className="photo-popup-cover"
                          src={`/asset/image/${encodeURIComponent(current.cover)}`}
                          alt=""
                          loading="lazy"
                        />
                      )}
                      <div className="photo-popup-body">
                        <div className="photo-popup-title">{current.title}</div>
                        <div className="photo-popup-meta">{current.location}</div>
                        <Link className="photo-popup-open" to={`/photo/${current.slug}`}>
                          Open →
                        </Link>
                      </div>
                    </div>
                  );
                }}
              />
            </div>

            <div
              className="photo-timeline"
              role="slider"
              aria-label="Photo timeline"
              aria-valuenow={index ?? -1}
              aria-valuemin={0}
              aria-valuemax={entries.length - 1}
              ref={timelineRef}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                handlePointer(e);
              }}
              onPointerMove={(e) => {
                if (e.buttons > 0) handlePointer(e);
              }}
            >
              <div className="photo-timeline-inner">
                <div className="photo-timeline-line" />
                {entries.map((e, i) => {
                  const active = i === index;
                  return (
                    <div
                      key={e.slug}
                      className={active ? 'photo-tl-dot active' : 'photo-tl-dot'}
                      style={{ left: `${posFor(e.date)}%` }}
                      aria-hidden={!active}
                    >
                      {active && (
                        <span className="photo-tl-dot-date">{formatShortDate(e.date)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </article>
    </main>
  );
}
