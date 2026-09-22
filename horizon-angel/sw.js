const CACHE_NAME = "horizon-angel-v1";
const OFFLINE = ["/","/index.html","/dashboard.html","/sensors.html","/blocks.html","/license.html","/admin.html","/config.js"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(OFFLINE)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.url.includes("/api/")) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE_NAME).then(cache => cache.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => { const cl = r.clone(); caches.open(CACHE_NAME).then(cache => cache.put(e.request, cl)); return r; })));
});
