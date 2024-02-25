// const CACHE_NAME = "version 1"

// const urlsToCache =[
//     "index.html", "offline.html"
// ]

// const self = this
// //Installation

// self.addEventListener("install", (event) =>{
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then((cache) =>{
//             console.log("Cache Open")
//             return cache.addAll(urlsToCache)
//         })
//     )
// });


// //Listen for Request
// self.addEventListener("fetch", (event) =>{
//     event.respondWith(
//         caches.match(event.request)
//         .then(() => {
//             return fetch(event.request)
//             .catch(() =>  caches.match('offline.html'))
//         })
//     )

// });



// //ACtivate Service worker
// self.addEventListener("activate", (event) =>{
//     const cacheWhiteList = []
//     cacheWhiteList.push(CACHE_NAME)

//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhiteList.includes(cacheName)){
//                     return caches.delete(cacheName);
//                 }
//                 // return cacheName
//             })
//         ))
//     )

// });




const CACHE_NAME = "version1"
const self = this
//Installation

const urlsToCache =[    
    "/static/js/bundle.js",
    "/static/js/main.chunk.js",
    "/static/js/0.chunk.js",
    "/city-list",
    "/city-details/",
    "/search",
    "/favicon.ico",
    "/manifest.json",
    "/winter6.jpg",
    "/inpage.js",
    "/injectedScript.bundle.js",
    "/injected.bundle.js",
    "/android-chrome-192x192.png",
    "/index.html",
    "/"
]

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
self.addEventListener("fetch", (event) =>{
    if(!navigator.onLine){
        event.respondWith(
            caches.match(event.request)
            .then((res) => {
                if(res){
                    return res
                }   
            })
        )

    }
 

});
