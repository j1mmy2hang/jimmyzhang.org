import { useMemo, useRef, useEffect, useState } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import * as d3Selection from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import 'd3-transition';

/* ------------------------------------------------------------------ *
 * Layout constants — the SVG coordinate space.
 * ------------------------------------------------------------------ */
const CANVAS_W = 1200;
const CANVAS_H = 800;

/* ------------------------------------------------------------------ *
 * Projection — fit to Eurasia bounds.
 * ------------------------------------------------------------------ */
const eurasiaBounds = {
  type: 'Polygon',
  coordinates: [[[-15, 18], [145, 18], [145, 72], [-15, 72], [-15, 18]]],
} as any;

const projection = geoEqualEarth();
projection.fitExtent(
  [
    [40, 30],
    [CANVAS_W - 40, CANVAS_H - 30],
  ],
  eurasiaBounds
);

const pathGen = geoPath(projection);

const topo = worldData as any;
const countries = feature(topo, topo.objects.countries) as any;

/* ------------------------------------------------------------------ *
 * Public helpers
 * ------------------------------------------------------------------ */
export function projectPoint(lng: number, lat: number): [number, number] | null {
  const p = projection([lng, lat]);
  return p ? [p[0], p[1]] : null;
}

export const MAP_WIDTH = CANVAS_W;
export const MAP_HEIGHT = CANVAS_H;

export type Pin = { id: string; lat: number; lng: number };

/* ------------------------------------------------------------------ *
 * Cluster offsets
 *
 * Multiple photos at the same city share a lat/lng, so their projected
 * screen positions collide. Group by rounded projected coords, then fan
 * overlapping members out in a small ring so each pin is individually
 * clickable and visible at the overview zoom.
 * ------------------------------------------------------------------ */
function computePinGeom(pins: Pin[]): Map<string, [number, number]> {
  const geom = new Map<string, [number, number]>();
  const raw = new Map<string, [number, number]>();
  const groups = new Map<string, string[]>();

  for (const pin of pins) {
    const p = projection([pin.lng, pin.lat]);
    if (!p) continue;
    raw.set(pin.id, [p[0], p[1]]);
    const key = `${Math.round(p[0])}_${Math.round(p[1])}`;
    const bucket = groups.get(key);
    if (bucket) bucket.push(pin.id);
    else groups.set(key, [pin.id]);
  }

  for (const ids of groups.values()) {
    if (ids.length === 1) {
      geom.set(ids[0], raw.get(ids[0])!);
      continue;
    }
    const [baseX, baseY] = raw.get(ids[0])!;
    const n = ids.length;
    // Small fixed radius — just enough to show there are multiple pins,
    // without visually migrating them off the real location.
    const radius = 4.5;
    ids.forEach((id, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      geom.set(id, [baseX + radius * Math.cos(angle), baseY + radius * Math.sin(angle)]);
    });
  }

  return geom;
}

/* ------------------------------------------------------------------ *
 * Viewport calculations mapped to programmatic zooms
 * ------------------------------------------------------------------ */
type ViewBox = { x: number; y: number; w: number; h: number };

function overviewBox(pinGeom: Map<string, [number, number]>, aspect: number): ViewBox {
  const coords = Array.from(pinGeom.values());
  if (coords.length === 0) return { x: 0, y: 0, w: CANVAS_W, h: CANVAS_H };

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const [cx, cy] of coords) {
    if (cx < minX) minX = cx;
    if (cx > maxX) maxX = cx;
    if (cy < minY) minY = cy;
    if (cy > maxY) maxY = cy;
  }

  const padX = Math.max((maxX - minX) * 0.25, 60);
  const padY = Math.max((maxY - minY) * 0.25, 60);

  let w = maxX - minX + padX * 2;
  let h = maxY - minY + padY * 2;
  let x = minX - padX;
  let y = minY - padY;

  const currentAspect = w / h;
  if (currentAspect > aspect) {
    const newH = w / aspect;
    y -= (newH - h) / 2;
    h = newH;
  } else {
    const newW = h * aspect;
    x -= (newW - w) / 2;
    w = newW;
  }

  return { x, y, w, h };
}

function focusBox(
  pinGeom: Map<string, [number, number]>,
  id: string,
  aspect: number
): ViewBox {
  const p = pinGeom.get(id);
  if (!p) return { x: 0, y: 0, w: CANVAS_W, h: CANVAS_H };

  const w = 120;
  const h = w / aspect;

  const x = p[0] - w / 2;
  const y = p[1] - h * 0.6;

  return { x, y, w, h };
}

function viewBoxToTransform(vb: ViewBox): d3Zoom.ZoomTransform {
  const k = CANVAS_W / vb.w;
  const tx = -vb.x * k;
  const ty = -vb.y * k;
  return d3Zoom.zoomIdentity.translate(tx, ty).scale(k);
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */
export default function WorldMap({
  pins,
  activeId,
  onPinClick,
  onBackgroundClick,
  renderOverlay,
}: {
  pins: Pin[];
  activeId: string | null;
  onPinClick: (id: string) => void;
  onBackgroundClick?: () => void;
  renderOverlay?: (pin: Pin, leftPercent: number, topPercent: number) => React.ReactNode;
}) {
  const countryPaths = useMemo(
    () =>
      (countries.features as any[])
        .map((f, i) => ({ id: i, d: pathGen(f) || '' }))
        .filter((c) => c.d.length > 0),
    []
  );

  const pinGeom = useMemo(() => computePinGeom(pins), [pins]);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapGroupRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<d3Zoom.ZoomBehavior<Element, unknown> | null>(null);

  /* ---- Aspect ratio tracks container ---- */
  const [aspect, setAspect] = useState(CANVAS_W / CANVAS_H);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (height > 0) setAspect(width / height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- Camera & popup state ---- *
   *
   * finalTransform → last resting transform, used to project the active pin
   *   to screen coordinates for the HTML overlay.
   * popupId → the pin id the popup is currently anchored to. Overlay only
   *   renders when popupId === activeId. Any mismatch (stale popupId from a
   *   previous pin, or null during interaction) keeps the popup hidden, so
   *   it never flashes at the wrong place.
   *
   * Intention detection:
   *   - Direct/programmatic camera move (clicking a timeline dot or a pin):
   *     d3 fires zoom events with no sourceEvent → on 'end' we surface the
   *     popup immediately.
   *   - User drag / wheel: d3 events carry a sourceEvent → hide popup on
   *     'start', wait 140ms after 'end' to make sure they've stopped, then
   *     restore.
   * ---------------------------------------------------------------- */
  const [finalTransform, setFinalTransform] = useState<d3Zoom.ZoomTransform>(d3Zoom.zoomIdentity);
  const [popupId, setPopupId] = useState<string | null>(null);
  const popupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  // Tracks whether the pointer moved between pointerdown and the click
  // event. d3-zoom's 'zoom' fires per-frame during a drag, so we latch
  // this ref on any zoom event with a sourceEvent, and clear it when the
  // click handler has seen-and-ignored the trailing click.
  const draggedRef = useRef(false);
  const activeIdRef = useRef<string | null>(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  });

  const clearPopupTimeout = () => {
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
  };

  /* ---- Initialize D3 Zoom ---- */
  useEffect(() => {
    if (!svgRef.current || !mapGroupRef.current) return;
    const svg = d3Selection.select(svgRef.current);
    const mapGroup = d3Selection.select(mapGroupRef.current);

    const zoom = d3Zoom.zoom()
      .scaleExtent([0.5, 80])
      .on('start', (event) => {
        clearPopupTimeout();
        if (event.sourceEvent) userActiveRef.current = true;
        setPopupId(null);
      })
      .on('zoom', (event) => {
        const t = event.transform;
        mapGroup.attr('transform', t.toString());

        // A 'zoom' event with a sourceEvent means the user actually moved
        // the map — latch so the trailing click is suppressed.
        if (event.sourceEvent) draggedRef.current = true;

        // Counter-scale pins so they stay visible at any zoom level. Handled
        // outside React for 60fps interaction.
        const invK = 1 / t.k;
        mapGroup
          .selectAll('.world-map-pin:not(.world-map-pin-active)')
          .attr('r', 6.5 * invK)
          .style('stroke-width', 1.6 * invK);
        mapGroup
          .selectAll('.world-map-pin-active')
          .attr('r', 9 * invK)
          .style('stroke-width', 2 * invK);
        mapGroup
          .selectAll('.world-map-pin-halo')
          .attr('r', 20 * invK);
      })
      .on('end', (event) => {
        setFinalTransform(event.transform);
        clearPopupTimeout();

        if (event.sourceEvent) {
          // User interaction ended — hold the popup hidden for a
          // generous grace window so rapid sequential drags don't cause
          // the popup to pop in between each.
          userActiveRef.current = false;
          popupTimeoutRef.current = setTimeout(() => {
            if (!userActiveRef.current && activeIdRef.current) {
              setPopupId(activeIdRef.current);
            }
          }, 600);
        } else if (activeIdRef.current) {
          // Programmatic camera move — surface the popup immediately.
          setPopupId(activeIdRef.current);
        }
      });

    svg.call(zoom as any);
    zoomRef.current = zoom as any;

    return () => {
      svg.on('.zoom', null);
      clearPopupTimeout();
    };
  }, []);

  /* ---- Programmatic camera driven by activeId / aspect ---- */
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!zoomRef.current || !svgRef.current) return;

    const initialLoad = !hasInitializedRef.current;
    hasInitializedRef.current = true;

    let targetVB: ViewBox;
    if (!activeId) {
      targetVB = overviewBox(pinGeom, aspect);
    } else {
      if (!pinGeom.has(activeId)) return;
      targetVB = focusBox(pinGeom, activeId, aspect);
    }

    const t = viewBoxToTransform(targetVB);

    d3Selection.select(svgRef.current)
      .transition()
      .duration(initialLoad ? 0 : 900)
      .call(zoomRef.current.transform as any, t);
  }, [activeId, pinGeom, aspect]);

  const aspectHeight = CANVAS_W / aspect;

  return (
    <div ref={containerRef} className="world-map-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${CANVAS_W} ${aspectHeight}`}
        className="world-map"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="World map of photo locations"
        preserveAspectRatio="xMidYMid meet"
        style={{ touchAction: 'none' }}
        onClick={() => {
          // A trailing click after a pan/zoom should not exit focus mode.
          if (draggedRef.current) {
            draggedRef.current = false;
            return;
          }
          onBackgroundClick?.();
        }}
      >
        <g ref={mapGroupRef}>
          <g className="world-map-countries">
            {countryPaths.map((c) => (
              <path key={c.id} d={c.d} className="world-map-country" />
            ))}
          </g>
          <g className="world-map-pins">
            {pins.map((p) => {
              const pos = pinGeom.get(p.id);
              if (!pos) return null;
              const [x, y] = pos;
              const active = p.id === activeId;
              const invK = 1 / finalTransform.k;
              return (
                <g key={p.id} transform={`translate(${x}, ${y})`}>
                  {active && <circle r={20 * invK} className="world-map-pin-halo" />}
                  <circle
                    r={(active ? 9 : 6.5) * invK}
                    strokeWidth={(active ? 2 : 1.6) * invK}
                    className={
                      active
                        ? 'world-map-pin world-map-pin-active'
                        : 'world-map-pin'
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      onPinClick(p.id);
                    }}
                  />
                </g>
              );
            })}
          </g>
        </g>
      </svg>
      {popupId && popupId === activeId && renderOverlay && (() => {
        const pin = pins.find((p) => p.id === activeId);
        if (!pin) return null;
        const pos = pinGeom.get(pin.id);
        if (!pos) return null;

        const t = finalTransform;
        const screenX = pos[0] * t.k + t.x;
        const screenY = pos[1] * t.k + t.y;

        // Hide if the anchor has been panned outside the visible map box.
        if (
          screenX < 0 ||
          screenX > CANVAS_W ||
          screenY < 0 ||
          screenY > aspectHeight
        ) {
          return null;
        }

        const leftPercent = (screenX / CANVAS_W) * 100;
        const topPercent = (screenY / aspectHeight) * 100;

        return renderOverlay(pin, leftPercent, topPercent);
      })()}
    </div>
  );
}
