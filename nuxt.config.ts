// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Uptowin — Your next adventure starts here',
      meta: [
        { name: 'description', content: 'Enter a universe where every decision leads to victory. Play your way with Uptowin.' },
        { name: 'theme-color', content: '#10110f' },
        { property: 'og:title', content: 'Uptowin — Big game. Your move.' },
        { property: 'og:description', content: 'A new era of mobile gaming. Join the Uptowin community.' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', type: 'image/svg+xml', href: '/pwa-icon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
      ],
    },
  },
  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2025-07-15',
  typescript: { strict: true, typeCheck: true },
  eslint: { config: { stylistic: true } },
})
