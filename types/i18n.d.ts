export {}

declare module '#app' {
  interface NuxtApp {
    $i18n: {
      language: import('vue').Ref<string>
      t: (key: string, locale?: string) => string
      setLocale: (locale: 'uk' | 'en') => Promise<void>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $i18n: {
      language: import('vue').Ref<string>
      t: (key: string, locale?: string) => string
      setLocale: (locale: 'uk' | 'en') => Promise<void>
    }
  }
}
