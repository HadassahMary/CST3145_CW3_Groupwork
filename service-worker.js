var cacheName = 'schoolclub-v1';
var cacheFiles = [
    'index.html',
    'lessons.js',
    'schoolclub.webmanifest',
    'style.css',
    'images/about.png',
    'images/art.png',
    'images/background.jpg',
    'images/basketball.png',
    'images/Biology.png',
    'images/chemistry.png',
    'images/Drama.png',
    'images/favicon.svg',
    'images/icon-512.png',
    'images/icon-192.png',
    'images/Math.png',
    'images/music.png',
    'images/photography.png',
    'images/reading.png',
    'images/soccer.png'
];

self.addEventListener('install', (e) => {
    console.log("[Service Worker] install");
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log("[Service Worker] Caching all the files..");
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('fetch', function (e){
//     e.respondWith(
//         caches.match(e.request).then(function (r){
//             console.log("[Service Worker] Fetching resources...")
//             return r
//         })
//     );
// });


self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});