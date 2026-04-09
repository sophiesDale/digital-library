const CACHE_NAME = "library-cache-v1";

const urlsToCache = ["/", "/frontPage.html", "/main.css", "/app.mjs"];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(async (cache) => {
			for (const url of urlsToCache) {
				try {
					await cache.add(url);
				} catch (err) {
					console.warn("Failed to cache:", url);
				}
			}
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
