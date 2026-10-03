const CACHE_NAME = 'uptowin-v2'
const CORE_ASSETS = ['/', '/manifest.webmanifest', '/pwa-icon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  // Always check the server for fresh HTML. A cache-first document can keep
  // pointing at an old hashed JS bundle after the app has been redeployed.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy))
        }
        return response
      }).catch(() => caches.match('/'))
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
      }
      return response
    }).catch(() => request.mode === 'navigate' ? caches.match('/') : Response.error()))
  )
})
