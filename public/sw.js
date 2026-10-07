// Service Worker: hält alle App-Dateien offline verfügbar.
// Bei Änderungen an der App die Versionsnummer erhöhen.
const CACHE = "fintelify-v1";
const ASSETS = ["./", "index.html", "styles.css", "app.js", "icon.svg", "icon-192.png", "manifest.webmanifest", "impressum.html", "datenschutz.html", "nutzungsbedingungen.html"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // Netz zuerst, damit Updates sofort ankommen; ohne Netz aus dem Zwischenspeicher.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});
