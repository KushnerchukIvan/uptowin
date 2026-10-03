export function useSiteI18n() {
  const { $i18n } = useNuxtApp()
  const locale = computed(() => $i18n.language.value as 'uk' | 'en')
  const t = (key: string) => $i18n.t(key, locale.value)

  return {
    locale,
    t,
    setLocale: $i18n.setLocale,
  }
}
