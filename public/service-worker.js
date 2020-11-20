// General cache
const CACHE_NAME = "my-site-cache-v1";

// Data cache
const DATA_CACHE_NAME = "data-cache-v1";

// URLs to cache
const urlsToCache = [
  "/",
  "/db.js",
  "/index.js",
  "/manifest.json",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

// Event listener to fire when user installs app as stand-alone PWA
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Event listener telling service worker to listen for "fetch" events
self.addEventListener("fetch", function(event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {

        // "Fetch" works, cache data retrieved
        return fetch(event.request)
          .then(response => {
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })

          // "Fetch" failed
          .catch(err => {
            // Network request failed, attempt to retrieve data from cache
            return cache.match(event.request);
          });
      }).catch(err => console.log(err))
    );
    return;
  }

  // Home page calls
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get("accept").includes("text/html")) {
          // return cached home page for all requests for html pages
          return caches.match("/");
        }
      });
    })
  );
});