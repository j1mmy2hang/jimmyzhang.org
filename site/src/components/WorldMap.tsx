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
 * Viewport calculations mapped to programmatic zooms
 * ------------------------------------------------------------------ */
type ViewBox = { x: number; y: number; w: number; h: number };

function overviewBox(pins: Pin[], aspect: number): ViewBox {
  const coords = pins
    .map((p) => projection([p.lng, p.lat]))
    .filter((c): c is [number, number] => c !== null);

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

function focusBox(pin: Pin, aspect: number): ViewBox {
  const p = projection([pin.lng, pin.lat]);
  if (!p) return { x: 0, y: 0, w: CANVAS_W, h: CANVAS_H };

  const w = 120;
  const h = w / aspect;
  
  const x = p[0] - w / 2;
  const y = p[1] - h * 0.6; // lower center so popup fits above naturally

  return { x, y, w, h };
}

// Convert absolute coordinates mapping into a D3 internal transform matrix directly
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
  renderOverlay,
}: {
  pins: Pin[];
  activeId: string | null;
  onPinClick: (id: string) => void;
  renderOverlay?: (pin: Pin, leftPercent: number, topPercent: number) => React.ReactNode;
}) {
  const countryPaths = useMemo(
    () =>
      (countries.features as any[])
        .map((f, i) => ({ id: i, d: pathGen(f) || '' }))
        .filter((c) => c.d.length > 0),
    []
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapGroupRef = useRef<SVGGElement>(null);
  const zoomRef = useRef<d3Zoom.ZoomBehavior<Element, unknown> | null>(null);

  /* ---- View / Zoom states ---- */
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

  const [isAnimating, setIsAnimating] = useState(false);
  const [finalTransform, setFinalTransform] = useState<d3Zoom.ZoomTransform>(d3Zoom.zoomIdentity);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ---- Initialize D3 Zoom ---- */
  useEffect(() => {
    if (!svgRef.current || !mapGroupRef.current) return;
    const svg = d3Selection.select(svgRef.current);
    const mapGroup = d3Selection.select(mapGroupRef.current);
    
    // Bind native hardware-accelerated D3 zooming logic directly mapping pointer mechanics
    const zoom = d3Zoom.zoom()
      .scaleExtent([0.5, 80])
      .on('start', () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsAnimating(true);
      })
      .on('zoom', (event) => {
        const t = event.transform;
        mapGroup.attr('transform', t.toString());
        
        // Scale elements natively bypassing React for absolute fluid 60FPS dragging!
        const invK = 1 / t.k;
        mapGroup.selectAll('.world-map-pin').attr('r', 6.5 * invK).style('stroke-width', 1.6 * invK);
        mapGroup.selectAll('.world-map-pin-active').attr('r', 9 * invK).style('stroke-width', 2 * invK);
        mapGroup.selectAll('.world-map-pin-halo').attr('r', 20 * invK);
      })
      .on('end', (event) => {
        // Extended delay to buffer scrolling/resting inputs gracefully
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
          setFinalTransform(event.transform);
        }, 800); 
      });

    svg.call(zoom as any);
    zoomRef.current = zoom as any;

    return () => {
      svg.on('.zoom', null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /* ---- Drive programmatic view logic ---- */
  const prevActiveRef = useRef<string | null>(null);
  
  useEffect(() => {
    if (!zoomRef.current || !svgRef.current) return;

    if (activeId === prevActiveRef.current) return;
    const initialLoad = prevActiveRef.current === null;
    prevActiveRef.current = activeId;

    let targetVB: ViewBox;
    if (!activeId) {
      targetVB = overviewBox(pins, aspect);
    } else {
      const pin = pins.find((p) => p.id === activeId);
      if (!pin) return;
      targetVB = focusBox(pin, aspect);
    }

    const t = viewBoxToTransform(targetVB);
    
    // Orchestrate camera translation via native interpolators
    d3Selection.select(svgRef.current)
      .transition()
      .duration(initialLoad ? 0 : 1000)
      .call(zoomRef.current.transform as any, t);
      
  }, [activeId, pins, aspect]);

  const zoomFactor = 1 / finalTransform.k;
  const pinR = 6.5 * zoomFactor;
  const pinActiveR = 9 * zoomFactor;
  const haloR = 20 * zoomFactor;
  const strokeW = 1.6 * zoomFactor;

  const isIdStable = activeId === prevActiveRef.current;
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
        style={{ touchAction: 'none' }} // Surpass native browser scrolling mechanisms smoothly
      >
        <g ref={mapGroupRef}>
          <g className="world-map-countries">
            {countryPaths.map((c) => (
              <path key={c.id} d={c.d} className="world-map-country" />
            ))}
          </g>
          <g className="world-map-pins">
            {pins.map((p) => {
              const proj = projection([p.lng, p.lat]);
              if (!proj) return null;
              const [x, y] = proj;
              const active = p.id === activeId;
              
              return (
                <g key={p.id} transform={`translate(${x}, ${y})`}>
                  {active && (
                    <circle r={haloR} className="world-map-pin-halo" />
                  )}
                  <circle
                    r={active ? pinActiveR : pinR}
                    strokeWidth={active ? strokeW * 1.25 : strokeW}
                    className={
                      active
                        ? 'world-map-pin world-map-pin-active'
                        : 'world-map-pin'
                    }
                    data-id={p.id} // Retained data-binding safely
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
      {(!isAnimating && isIdStable && activeId && renderOverlay) && (() => {
        const pin = pins.find((p) => p.id === activeId);
        if (!pin) return null;
        const proj = projection([pin.lng, pin.lat]);
        if (!proj) return null;
        
        // Calculate true dynamic viewport positional mapping directly bridging matrix states natively 
        const t = finalTransform;
        const screenX = proj[0] * t.k + t.x;
        const screenY = proj[1] * t.k + t.y;
        
        const leftPercent = (screenX / CANVAS_W) * 100;
        const topPercent = (screenY / aspectHeight) * 100;
        
        return renderOverlay(pin, leftPercent, topPercent);
      })()}
    </div>
  );
}
