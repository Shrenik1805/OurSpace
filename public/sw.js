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

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, icon, badge, tag, data, requireInteraction, actions } = event.data.data;
    
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon,
        badge,
        tag,
        data,
        requireInteraction,
        actions,
        renotify: true,
        silent: false,
        vibrate: [200, 100, 200]
      })
    );
  }
});

// Push notification event listener (for server-sent notifications)
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let notificationData;
  
  try {
    notificationData = event.data ? event.data.json() : {};
    console.log('Notification data:', notificationData);
  } catch (e) {
    console.error('Failed to parse notification data:', e);
    notificationData = {
      title: 'HelloLove - New Entry! 💕',
      body: event.data ? event.data.text() : 'New journal entry from your loved one! 💕'
    };
  }

  const options = {
    body: notificationData.body || 'New journal entry from your loved one! 💕',
    icon: notificationData.icon || '/favicon.ico',
    badge: notificationData.badge || '/favicon.ico',
    data: {
      url: notificationData.url || notificationData.data?.url || '/',
      timestamp: Date.now()
    },
    actions: notificationData.actions || [
      {
        action: 'open',
        title: 'Read Entry',
        icon: '/favicon.ico'
      }
    ],
    tag: notificationData.tag || 'journal-entry',
    renotify: notificationData.renotify !== false,
    requireInteraction: notificationData.requireInteraction !== false,
    silent: notificationData.silent || false,
    vibrate: notificationData.vibrate || [200, 100, 200],
    timestamp: Date.now()
  };

  console.log('Showing notification with options:', options);

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'HelloLove - New Entry! 💕', 
      options
    ).then(() => {
      console.log('Notification shown successfully');
    }).catch(error => {
      console.error('Failed to show notification:', error);
    })
  );
});

// Notification click event listener
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.matchAll({ 
        type: 'window',
        includeUncontrolled: true 
      }).then((clientList) => {
        console.log('Found clients:', clientList.length);
        
        // Try to focus existing window first
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            console.log('Focusing existing window');
            return client.focus();
          }
        }
        
        // If no matching window found, open new one
        if (clients.openWindow) {
          console.log('Opening new window:', urlToOpen);
          return clients.openWindow(urlToOpen);
        }
        
        return null;
      }).catch(error => {
        console.error('Error handling notification click:', error);
      })
    );
  }
});

// Handle errors
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled promise rejection:', event.reason);
});
