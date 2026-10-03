<script setup lang="ts">
import AppFooter from '~/components/layout/AppFooter.vue'
import AppHeader from '~/components/layout/AppHeader.vue'

const { t } = useSiteI18n()
</script>

<template>
  <div class="site-shell">
    <a
      class="skip-link"
      href="#main-content"
    >{{ t('accessibility.skipToContent') }}</a>
    <AppHeader />
    <main id="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
