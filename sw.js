const CACHE_NAME = 'myrideke-shell-v1';
const OFFLINE_URL = '/#home';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo-192.png',
  '/assets/logo-512.png'
  // add other critical assets or fonts you want cached
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  // fallback-to-cache strategy for navigation and assets
  if (evt.request.mode === 'navigate' || (evt.request.method === 'GET' && evt.request.headers.get('accept').includes('text/html'))) {
    evt.respondWith(
      fetch(evt.request).catch(() => caches.match('/index.html'))
    );
    return;
  }
  evt.respondWith(
    caches.match(evt.request).then((r) => r || fetch(evt.request))
  );
});
