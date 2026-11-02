const 판 = "현장조사-c3bc1f7e2f";
const 파일들 = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(판).then(c => c.addAll(파일들))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== 판).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;   // 깃허브 연동 요청은 건드리지 않는다
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(있음 => 있음 || fetch(e.request)));
});
