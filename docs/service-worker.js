var CACHE_NAME = 'stintikvpn-v3';
var OFFLINE_URL = '/offline.html';
var urlsToCache = ['/', '/index.html', '/style.css', '/script.js', '/manifest.json', OFFLINE_URL];

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(urlsToCache); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(names) {
    return Promise.all(names.filter(function(n) { return n !== CACHE_NAME; }).map(function(n) { return caches.delete(n); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200) return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
        return response;
      }).catch(function() {
        if (event.request.destination === 'document') return caches.match(OFFLINE_URL);
      });
    })
  );
});
