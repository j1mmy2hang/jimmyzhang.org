export type GeoPoint = { lat: number; lng: number; label: string };

const entries: { keywords: string[]; point: GeoPoint }[] = [
  { keywords: ['helsinki'], point: { lat: 60.17, lng: 24.94, label: 'Helsinki' } },
  { keywords: ['silja', 'stockholm and helsinki', 'between stockholm'], point: { lat: 59.7, lng: 21.5, label: 'Baltic Sea' } },
  { keywords: ['stockholm'], point: { lat: 59.33, lng: 18.07, label: 'Stockholm' } },
  { keywords: ['paris'], point: { lat: 48.86, lng: 2.35, label: 'Paris' } },
  { keywords: ['liege', 'liége'], point: { lat: 50.63, lng: 5.58, label: 'Liège' } },
  { keywords: ['maastricht'], point: { lat: 50.85, lng: 5.69, label: 'Maastricht' } },
  { keywords: ['hoofddorp'], point: { lat: 52.30, lng: 4.69, label: 'Hoofddorp' } },
  { keywords: ['changshu'], point: { lat: 31.65, lng: 120.75, label: 'Changshu' } },
  { keywords: ['wiesbaden'], point: { lat: 50.08, lng: 8.24, label: 'Wiesbaden' } },
  { keywords: ['brussels'], point: { lat: 50.85, lng: 4.35, label: 'Brussels' } },
  { keywords: ['leiden'], point: { lat: 52.16, lng: 4.49, label: 'Leiden' } },
  { keywords: ['eindhoven'], point: { lat: 51.44, lng: 5.48, label: 'Eindhoven' } },
  { keywords: ['prague'], point: { lat: 50.08, lng: 14.44, label: 'Prague' } },
  { keywords: ['suzhou'], point: { lat: 31.30, lng: 120.58, label: 'Suzhou' } },
  { keywords: ['chengdu'], point: { lat: 30.67, lng: 104.07, label: 'Chengdu' } },
  { keywords: ['shanghai'], point: { lat: 31.23, lng: 121.47, label: 'Shanghai' } },
];

export function geocode(location: string): GeoPoint | null {
  const q = location.toLowerCase();
  for (const e of entries) {
    if (e.keywords.some((k) => q.includes(k))) return e.point;
  }
  return null;
}
