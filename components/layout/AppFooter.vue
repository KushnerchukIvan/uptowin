<script setup lang="ts">
const { t } = useSiteI18n()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <NuxtLink
        class="wordmark"
        to="/#home"
        aria-label="Uptowin, back to top"
      >
        <span
          class="wordmark__symbol"
          aria-hidden="true"
        ><span /></span>
        <span class="wordmark__name">UPTO<span>WIN</span><i>.</i></span>
      </NuxtLink>
      <p class="site-footer__tagline">
        {{ t('footer.tagline') }}
      </p>
      <div class="site-footer__right">
        <p>{{ t('footer.rights') }}</p>
        <a href="#join">{{ t('navigation.join') }} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer{border-top:1px solid var(--line)}.site-footer__inner{width:min(1440px,100%);min-height:96px;margin:auto;padding:20px var(--gutter);display:flex;align-items:center;justify-content:space-between;gap:24px}.wordmark{width:max-content;display:flex;align-items:center;gap:10px;color:var(--paper);text-decoration:none}.wordmark__symbol{width:25px;height:25px;border:1px solid var(--acid);border-radius:50%;display:grid;place-items:center}.wordmark__symbol span{width:7px;height:7px;border-radius:50%;background:var(--acid)}.wordmark__name{font-family:var(--font-display);font-size:12px;font-weight:700;letter-spacing:.1em}.wordmark__name span,.wordmark__name i{color:var(--acid)}.wordmark__name i{font-style:normal}.site-footer__tagline,.site-footer__right{color:var(--muted);font-size:10px}.site-footer__right{display:flex;align-items:center;gap:24px}.site-footer__right p{margin:0}.site-footer__right a{color:var(--paper);text-decoration:none}.site-footer__right a span{margin-left:7px;color:var(--acid)}
@media(max-width:650px){.site-footer__inner{min-height:unset;display:grid;grid-template-columns:1fr auto;gap:15px}.site-footer__tagline{grid-row:2;margin:0}.site-footer__right{display:contents}.site-footer__right p{grid-column:1;grid-row:3;font-size:9px}.site-footer__right a{grid-column:2;grid-row:2;font-size:9px}}
</style>
