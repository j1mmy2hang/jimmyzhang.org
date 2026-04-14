import { useMemo } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';

const WIDTH = 960;
const HEIGHT = 420;

// Eurasia bounding box — roughly Lisbon to Shanghai, N. Africa to arctic circle.
const eurasiaBounds = {
  type: 'Polygon',
  coordinates: [[[-12, 22], [140, 22], [140, 70], [-12, 70], [-12, 22]]],
} as any;

const projection = geoEqualEarth();
projection.fitExtent(
  [
    [30, 20],
    [WIDTH - 30, HEIGHT - 20],
  ],
  eurasiaBounds
);
projection.clipExtent([
  [0, 0],
  [WIDTH, HEIGHT],
]);

const pathGen = geoPath(projection);

const topo = worldData as any;
const countries = feature(topo, topo.objects.countries) as any;

export function projectPoint(lng: number, lat: number): [number, number] | null {
  const p = projection([lng, lat]);
  return p ? [p[0], p[1]] : null;
}

export const MAP_WIDTH = WIDTH;
export const MAP_HEIGHT = HEIGHT;

export type Pin = { id: string; lat: number; lng: number };

export default function WorldMap({
  pins,
  activeId,
  onPinClick,
}: {
  pins: Pin[];
  activeId: string | null;
  onPinClick: (id: string) => void;
}) {
  const countryPaths = useMemo(
    () =>
      (countries.features as any[])
        .map((f, i) => ({ id: i, d: pathGen(f) || '' }))
        .filter((c) => c.d.length > 0),
    []
  );

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="world-map"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="World map of photo locations"
    >
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
              {active && <circle r={12} className="world-map-pin-halo" />}
              <circle
                r={active ? 5 : 3}
                className={active ? 'world-map-pin world-map-pin-active' : 'world-map-pin'}
                onClick={() => onPinClick(p.id)}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
