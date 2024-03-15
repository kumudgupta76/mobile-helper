const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/battery.png',
  '/icon.png'
  // Add other assets you want to cache
];


self.addEventListener("install", event =>
event.waitUntil(
  caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
);
);

self.addEventListener("fetch", event => 
event.respondWith(
  caches.match(event.request)
    .then(response => response || fetch(event.request))
);
);

self.addEventListener("push", payload => {
    console.log("[Service Worker] Push Received.", payload.data.json());
    const notificationTitle = 'Notification !!!'
    const notificationOptions = {
      body: 'This is just a test notification sent from local servet',
      data: 'you can provide additional data here',
      icon: 'battery.png'
    };
  
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
