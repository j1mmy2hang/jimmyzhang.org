import { geoEqualEarth, geoMercator } from 'd3-geo';

const proj = geoEqualEarth();
console.log("center supported:", typeof proj.center === 'function');
console.log("rotate supported:", typeof proj.rotate === 'function');

const eurasiaBounds = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    // Lots of points along the parallel so it acts as a true rectangle of lat/lng
    coordinates: [[
      [-12, 22], [45, 22], [140, 22],
      [140, 45], [140, 70],
      [45, 70], [-12, 70],
      [-12, 45], [-12, 22]
    ]]
  }
};
const WIDTH = 960;
const HEIGHT = 420;

const p1 = geoEqualEarth().fitExtent([[0,0], [WIDTH, HEIGHT]], eurasiaBounds);
console.log("geoEqualEarth scale:", p1.scale(), "translate:", p1.translate());

const p2 = geoMercator().fitExtent([[0,0], [WIDTH, HEIGHT]], eurasiaBounds);
console.log("geoMercator scale:", p2.scale(), "translate:", p2.translate());

