// Service Worker for HabitKit PWA
const CACHE_NAME = 'habitkit-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/habit-tracker',
  '/pomodoro',
  '/task-manager',
  '/css/styles.css',
  '/css/themes.css',
  '/css/habit-tracker.css',
  '/css/pomodoro.css',
  '/css/task-manager.css',
  '/css/loading.css',
  '/js/theme-switcher.js',
  '/js/loading.js',
  '/js/habit-tracker.js',
  '/js/pomodoro.js',
  '/js/task-manager.js',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Cache new requests
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          });
      })
      .catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/habit-tracker');
        }
      })
  );
});
