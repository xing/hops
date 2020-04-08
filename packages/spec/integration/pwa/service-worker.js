const CACHE_NAME = 'hops-pwa-cache';

export default (config, assets) => {
  const cacheables = assets.map((a) => '/' + a).concat(config.locations);

  self.addEventListener('install', (evt) => {
    evt.waitUntil(precache());
  });

  self.addEventListener('fetch', (evt) => {
    // bypass service worker entirely for non-cached assets so that
    // Response.fromServiceWorker() correctly returns "false" for non-cached
    // responses
    if (!cacheables.includes(evt.request.url.replace(location.origin, ''))) {
      return;
    }
    evt.respondWith(fromCache(evt.request));
  });

  async function precache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(cacheables);
  }

  async function fromCache(request) {
    const cache = await caches.open(CACHE_NAME);
    const match = await cache.match(request);
    return match || fetch(request);
  }
};
