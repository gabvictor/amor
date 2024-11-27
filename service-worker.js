const CACHE_NAME = "amor-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache aberto");
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
