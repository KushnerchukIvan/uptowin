import { createInstance } from 'i18next'
import english from '../locales/en'
import ukrainian from '../locales/uk'

export default defineNuxtPlugin(async () => {
  const i18next = createInstance()
  const language = ref('uk')
  await i18next.init({
    lng: 'uk',
    fallbackLng: 'uk',
    resources: {
      uk: { translation: ukrainian },
      en: { translation: english },
    },
    initImmediate: false,
  })
  language.value = i18next.language.startsWith('en') ? 'en' : 'uk'
  i18next.on('languageChanged', (next) => {
    language.value = next.startsWith('en') ? 'en' : 'uk'
  })
  return {
    provide: {
      i18n: {
        language,
        t: (key: string, languageOverride = language.value) => String(i18next.t(key, { lng: languageOverride })),
        setLocale: async (next: 'uk' | 'en') => { await i18next.changeLanguage(next) },
      },
    },
  }
})
