const 판 = "현장조사-29c53b55c0";
const 파일들 = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
// 웹 공간이 파일을 10분씩 들고 있으므로(max-age=600) 그 저장본을 건너뛰고 늘 새로 받는다
self.addEventListener("install", e => { e.waitUntil(caches.open(판).then(c => c.addAll(파일들.map(f => new Request(f, {cache: "reload"}))))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== 판).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;   // 깃허브 연동 요청은 건드리지 않는다
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(있음 => 있음 || fetch(e.request)));
});
