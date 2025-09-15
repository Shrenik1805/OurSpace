const CACHE_NAME = 'love-letters-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/ambient-music.mp3',
  // Add additional assets as needed for your app
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Push notification event listener
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New journal entry from your loved one! 💕',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Open HelloLove',
        icon: '/favicon.ico'
      }
    ],
    tag: 'journal-entry',
    renotify: true,
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification('HelloLove - New Entry! 💕', options)
  );
});

// Notification click event listener
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});
