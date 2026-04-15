import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { loadNoteIndex, type ClippingMeta } from '../noteIndex';
import '../styles/page.css';
import '../styles/note.css';

type Entry = ClippingMeta & { slug: string };

const ITEM_HEIGHT = 88; // pixel gap between consecutive wheel slots
const VISIBLE_RADIUS = 5; // items rendered above/below the focus
const DRAG_THRESHOLD = 4; // px before a pointerdown promotes to a drag
const SNAP_DELAY = 160; // ms of idle before snapping to nearest item
const WHEEL_STEP = 0.9; // how fast a wheel tick moves focus

function mod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

export default function ClippingWheel() {
  const [items, setItems] = useState<Entry[] | null>(null);
  const [focus, setFocus] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const focusRef = useRef(0);
  const draggingRef = useRef(false);
  const snapTimer = useRef<number | null>(null);
  const spinRaf = useRef<number | null>(null);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    let cancelled = false;
    loadNoteIndex().then((idx) => {
      if (cancelled) return;
      const list = Object.entries(idx.clipping)
        .map(([slug, meta]) => ({ slug, ...meta }))
        .sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return b.date.localeCompare(a.date);
        });
      setItems(list);
      if (list.length > 0) {
        setFocus(Math.floor(Math.random() * list.length));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => {
    if (spinRaf.current != null) cancelAnimationFrame(spinRaf.current);
  }, []);

  const spin = () => {
    if (!items || items.length === 0 || spinning) return;
    if (snapTimer.current != null) window.clearTimeout(snapTimer.current);

    const from = focusRef.current;
    const currentInt = Math.round(from);
    const n = items.length;
    const targetIdx = Math.floor(Math.random() * n);
    const revolutions = 1 + Math.floor(Math.random() * 2);
    // Always spin forward so the motion reads clearly.
    const delta = revolutions * n + mod(targetIdx - currentInt, n);
    const to = currentInt + delta;
    const duration = 1000 + delta * 7;
    const start = performance.now();
    setSpinning(true);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out quintic — hard start, long glide-out.
      const eased = 1 - Math.pow(1 - t, 5);
      const f = from + (to - from) * eased;
      setFocus(f);
      if (t < 1) {
        spinRaf.current = requestAnimationFrame(tick);
      } else {
        spinRaf.current = null;
        setFocus(to);
        setSpinning(false);
      }
    };
    spinRaf.current = requestAnimationFrame(tick);
  };

  const scheduleSnap = () => {
    if (snapTimer.current != null) window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      if (draggingRef.current) return;
      setFocus(Math.round(focusRef.current));
    }, SNAP_DELAY);
  };

  useEffect(() => {
    const el = wheelRef.current;
    if (!el || !items || items.length === 0) return;

    let drag: { startY: number; startFocus: number; id: number } | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = focusRef.current + (e.deltaY / ITEM_HEIGHT) * WHEEL_STEP;
      setFocus(next);
      scheduleSnap();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setFocus(Math.round(focusRef.current) + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocus(Math.round(focusRef.current) - 1);
      } else if (e.key === 'Enter') {
        const idx = mod(Math.round(focusRef.current), items.length);
        window.location.href = `/note/clipping/${items[idx].slug}`;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      // Don't start tracking on secondary buttons; let clicks on the center
      // Link pass through cleanly until we confirm a real drag.
      if (e.button !== 0) return;
      drag = { startY: e.clientY, startFocus: focusRef.current, id: e.pointerId };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return;
      const dy = e.clientY - drag.startY;
      if (!draggingRef.current) {
        if (Math.abs(dy) < DRAG_THRESHOLD) return;
        draggingRef.current = true;
        try {
          el.setPointerCapture(drag.id);
        } catch {
          /* noop */
        }
      }
      setFocus(drag.startFocus - dy / ITEM_HEIGHT);
    };

    const onPointerUp = (e: PointerEvent) => {
      const wasDragging = draggingRef.current;
      draggingRef.current = false;
      if (wasDragging) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* noop */
        }
        setFocus(Math.round(focusRef.current));
      }
      drag = null;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('keydown', onKey);
    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('keydown', onKey);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [items]);

  const slots = useMemo(() => {
    if (!items || items.length === 0) return [];
    const n = items.length;
    const nearest = Math.round(focus);
    const out: { item: Entry; offset: number; key: string }[] = [];
    for (let d = -VISIBLE_RADIUS; d <= VISIBLE_RADIUS; d++) {
      const idx = mod(nearest + d, n);
      out.push({
        item: items[idx],
        offset: nearest + d - focus,
        key: `${nearest + d}-${items[idx].slug}`,
      });
    }
    return out;
  }, [items, focus]);

  if (!items) {
    return (
      <main>
        <Breadcrumb section="note" />
        <article>
          <header className="page-header">
            <h1 className="page-title">Clipping</h1>
          </header>
          <p className="page-status">loading…</p>
        </article>
      </main>
    );
  }

  return (
    <main>
      <Breadcrumb section="note" />
      <article className="wheel-page">
        <header className="page-header">
          <h1 className="page-title">Clipping</h1>
          <p className="page-subtitle">
            Scroll, drag, or use arrow keys to navigate {items.length} clippings.<br></br>Or simply try your luck.
          </p>
        </header>
        <div
          className={`clipping-wheel${spinning ? ' is-spinning' : ''}`}
          ref={wheelRef}
          tabIndex={0}
          role="listbox"
          aria-label="clipping picker"
        >
          <div className="clipping-wheel-guides" aria-hidden="true" />
          <div className="clipping-wheel-inner">
            {slots.map(({ item, offset, key }) => {
              const abs = Math.abs(offset);
              const opacity = Math.max(0, 1 - abs * 0.32);
              const scale = Math.max(0.76, 1 - abs * 0.08);
              const translateY = offset * ITEM_HEIGHT;
              const isCenter = abs < 0.5;
              return (
                <div
                  key={key}
                  className={`wheel-item${isCenter ? ' wheel-item-focus' : ''}`}
                  style={{
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                    opacity,
                    pointerEvents: isCenter ? 'auto' : 'none',
                  }}
                >
                  <Link to={`/note/clipping/${item.slug}`} className="wheel-item-title">
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="wheel-actions">
          <button
            type="button"
            className="lucky-button"
            onClick={spin}
            disabled={spinning}
          >
            I'm feeling lucky
          </button>
        </div>
      </article>
    </main>
  );
}
