// Service Worker for HabitKit PWA
const CACHE_NAME = 'habitkit-v2';

// Cache both server-route paths (e.g. /pomodoro) and static-file paths (e.g. /pomodoro.html)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/habit-tracker',
  '/pomodoro',
  '/task-manager',
  '/habit-tracker.html',
  '/pomodoro.html',
  '/task-manager.html',
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

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Cache successful same-origin responses
            try {
              const url = new URL(event.request.url);
              if (url.origin === self.location.origin && fetchResponse && fetchResponse.status === 200) {
                const copy = fetchResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
              }
            } catch (e) {
              // ignore URL parsing/cache errors
            }
            return fetchResponse;
          })
        );
      })
      .catch(() => {
        // Offline fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/habit-tracker.html');
        }
      })
  );
});
