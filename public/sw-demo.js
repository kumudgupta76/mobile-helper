self.addEventListener("install", event =>
  event.waitUntil(caches.open("v1").then(cache => cache.add("/offline.html")))
);

self.addEventListener("fetch", event => 
    event.respondWith(
        fetch(event.request).catch(() => caches.open('v1').then(
            cache => cache.match('/offline.html')
            )
        )
    )
);

self.addEventListener("push", payload => {
    console.log("[Service Worker] Push Received.", payload.data.json());
    const notificationTitle = 'Notification !!!'
    const notificationOptions = {
      body: 'This is just a test notification sent from local servet',
      data: 'you can provide additional data here',
      icon: 'icon.png'
    };
  
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
