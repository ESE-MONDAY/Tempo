const CACHE_NAME = "version1";

const urlsToCache = [
    "index.html", 
    "offline.html",
    "./manifest.json",
    "./android-chrome-192x192.png",
    "./",
    ".header-bg.png",
    "./favicon.ico",
    "./static/js/main.4d5113ea.js",
    "./static/js/bundle.js",
    "./static/css/main.073c9b0a.css",
    "/city-list",
    "/city-details",
    "/search"
];
const self = this;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Cache Open");
            return cache.addAll(urlsToCache);
        })
    );
});

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }).catch(reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

self.addEventListener('fetch', function (evt) {
    evt.respondWith(
        fromNetwork(evt.request, 400).catch(() => fromCache(evt.request))
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhiteList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});
