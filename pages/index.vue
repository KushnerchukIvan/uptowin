<script setup lang="ts">
import FeatureSection from '~/components/home/FeatureSection.vue'
import JourneySection from '~/components/home/JourneySection.vue'
import SiteHero from '~/components/home/SiteHero.vue'
import WaitlistSection from '~/components/home/WaitlistSection.vue'

const { t, locale } = useSiteI18n()
useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.description') },
  ],
}))
</script>

<template>
  <div>
    <SiteHero />
    <FeatureSection />
    <JourneySection />
    <WaitlistSection />
  </div>
</template>
