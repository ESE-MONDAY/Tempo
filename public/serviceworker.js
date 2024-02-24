const CACHE_NAME = "version 1"

const urlsToCache =[
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
]

const self = this
//Installation

self.addEventListener("install", (event) =>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) =>{
            console.log("Cache Open")
            return cache.addAll(urlsToCache)
        })
    )
});


//Listen for Request
// self.addEventListener("fetch", (event) =>{
//     event.respondWith(
//         caches.match(event.request)
//         .then(() => {
//             return fetch(event.request)
//             .catch(() =>  caches.match('offline.html'))
//         })
//     )

// });
function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
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

    if (!navigator.onLine) {
        console.log("offline");
        if (evt.request.url === "https://tempo-gules.vercel.app/static/js/main.chunk.js") {
            evt.waitUntil(
                this.registration.showNotification("modeNet", {
                    body: "Offline",
                    icon: "https://tempo-gules.vercel.app/android-chrome-192x192.png",
                })
            );
        }
    }

     evt.respondWith(
        fromNetwork(evt.request, 400).catch(() => fromCache(evt.request))
    );
    evt.waitUntil(update(evt.request));
});

function update(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}



//ACtivate Service worker
self.addEventListener("activate", (event) =>{
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
                // return cacheName
            })
        ))
    )

});
