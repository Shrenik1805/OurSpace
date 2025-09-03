const CACHE_NAME = 'love-letters-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  // Add additional assets as needed for your app
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
