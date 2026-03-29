const CACHE_NAME = 'escape-room-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/service-worker.js',
    '/assets/images/tela-inicial.png',
    '/assets/images/narrativa1.png',
    '/assets/images/narrativa2.png',
    '/assets/images/narrativa3.png',
    '/assets/images/narrativa4.png',
    '/assets/images/narrativa5.png',
    '/assets/images/narrativa6.png',
    '/assets/images/narrativa7.png',
    '/assets/images/acerto.png',
    '/assets/images/erro.png',
    '/assets/images/tempo-esgotado.png',
    '/assets/images/desafio-final.png',
    '/assets/images/vitoria.png',
    '/assets/images/derrota.png',
    '/assets/sounds/musica.mp3',
    '/assets/sounds/erro.mp3',
    '/assets/sounds/acerto.mp3',
    '/assets/sounds/tempo-esgotado.mp3',
    '/assets/sounds/cronometro.mp3',
    '/assets/sounds/vitoria.mp3',
    '/assets/sounds/derrota.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/index.html');
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
