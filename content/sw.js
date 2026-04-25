// Kill-switch service worker. A previous build briefly shipped a workbox SW
// that registered against this origin; some browsers still have it installed
// and serve stale precached HTML/JS. This replacement self-unregisters on
// activate, clears all caches, and reloads open tabs so users land on a
// clean, no-SW state. Safe to remove once traffic has cycled through.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const c of clients) {
      try { c.navigate(c.url); } catch {}
    }
  })());
});

self.addEventListener('fetch', () => {
  // Pass-through. Don't intercept anything while we're winding down.
});
