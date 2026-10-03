export default defineNuxtPlugin(() => {
  if (!('serviceWorker' in navigator)) return

  if (import.meta.dev) {
    void navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      if (registrations.length === 0) return

      await Promise.all(registrations.map(registration => registration.unregister()))
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter(name => name.startsWith('uptowin-'))
          .map(name => caches.delete(name)),
      )

      // The current page may still be controlled by the old worker until the
      // next navigation. Reload once without the stale Vite-module cache.
      window.location.reload()
    }).catch((error: unknown) => {
      console.error('Failed to clear the development service worker:', error)
    })
    return
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((registration) => {
      void registration.update()
    }).catch((error: unknown) => {
      console.error('Service worker registration failed:', error)
    })
  }, { once: true })
})
