const CACHE_NAME = "library-cache-v2";

const urlsToCache = ["/", "/main.css", "/app.mjs"];

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
		caches.match(event.request).then((cached) => {
			if (cached) return cached;

			return fetch(event.request)
				.then((response) => {
					const clone = response.clone();

					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, clone);
					});

					return response;
				})
				.catch(() => {
					return caches.match("/");
				});
		})
	);
});
