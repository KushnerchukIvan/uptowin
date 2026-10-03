<script setup lang="ts">
const { locale, setLocale, t } = useSiteI18n()
const isMenuOpen = ref(false)

watch(locale, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <NuxtLink
        class="wordmark"
        to="/#home"
        :aria-label="`Uptowin — ${t('hero.titleFirst')} ${t('hero.titleSecond')}`"
      >
        <span
          class="wordmark__symbol"
          aria-hidden="true"
        ><span /></span>
        <span class="wordmark__name">UPTO<span>WIN</span><i>.</i></span>
      </NuxtLink>

      <nav
        class="site-nav"
        :class="{ 'site-nav--open': isMenuOpen }"
        :aria-label="locale === 'uk' ? 'Головна навігація' : 'Main navigation'"
      >
        <a
          class="site-nav__link"
          href="#game"
          @click="isMenuOpen = false"
        ><span>01</span>{{ t('navigation.game') }}</a>
        <a
          class="site-nav__link"
          href="#features"
          @click="isMenuOpen = false"
        ><span>02</span>{{ t('navigation.features') }}</a>
        <a
          class="site-nav__link"
          href="#how"
          @click="isMenuOpen = false"
        ><span>03</span>{{ t('navigation.howToPlay') }}</a>
        <a
          class="site-nav__mobile-cta"
          href="#join"
          @click="isMenuOpen = false"
        >{{ t('navigation.join') }} <span>↗</span></a>
      </nav>

      <div class="site-header__actions">
        <div
          class="locale-switch"
          :aria-label="locale === 'uk' ? 'Мова сайту' : 'Site language'"
        >
          <button
            type="button"
            :aria-pressed="locale === 'uk'"
            @click="setLocale('uk')"
          >
            UA
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            :aria-pressed="locale === 'en'"
            @click="setLocale('en')"
          >
            EN
          </button>
        </div>
        <a
          class="header-cta"
          href="#join"
        >{{ t('navigation.join') }} <span aria-hidden="true">↗</span></a>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? t('navigation.closeMenu') : t('navigation.menu')"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.site-header{position:relative;z-index:20;border-bottom:1px solid var(--line);background:rgba(12,14,15,.74);backdrop-filter:blur(16px)}
.site-header__inner{width:min(1440px,100%);height:82px;margin:auto;padding:0 var(--gutter);display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.wordmark{width:max-content;display:flex;align-items:center;gap:11px;text-decoration:none}.wordmark__symbol{width:30px;height:30px;border:1px solid var(--acid);border-radius:50%;display:grid;place-items:center}.wordmark__symbol span{width:9px;height:9px;border-radius:50%;background:var(--acid);box-shadow:0 0 15px var(--acid)}.wordmark__name{font-family:var(--font-display);font-size:15px;font-weight:700;letter-spacing:.11em}.wordmark__name span{color:var(--acid)}.wordmark__name i{color:var(--acid);font-style:normal}
.site-nav{display:flex;align-items:center;gap:clamp(22px,3vw,48px)}.site-nav__link{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:11px;letter-spacing:.035em;text-decoration:none;transition:color .2s}.site-nav__link span{color:#626a67;font-size:8px;font-variant-numeric:tabular-nums}.site-nav__link:hover{color:var(--paper)}.site-nav__mobile-cta{display:none}
.site-header__actions{justify-self:end;display:flex;align-items:center;gap:20px}.locale-switch{display:flex;align-items:center;gap:5px;color:#606764;font-size:9px}.locale-switch button{padding:5px 3px;border:0;background:transparent;color:#77817d;font-size:9px;cursor:pointer}.locale-switch button[aria-pressed=true]{color:var(--paper)}.header-cta{display:inline-flex;align-items:center;gap:19px;padding:11px 14px;border:1px solid #d7e9d62a;border-radius:4px;color:var(--paper);font-size:10px;text-decoration:none;transition:border-color .2s,background .2s}.header-cta:hover{border-color:var(--acid);background:#caf2850c}.header-cta span{color:var(--acid)}.menu-toggle{display:none}
@media(max-width:800px){.site-header__inner{height:72px;grid-template-columns:1fr auto}.site-nav{position:absolute;top:calc(100% + 1px);left:0;right:0;display:none;align-items:stretch;gap:0;padding:14px var(--gutter) 22px;border-bottom:1px solid var(--line);background:#0d1010f7}.site-nav--open{display:flex;flex-direction:column}.site-nav__link{padding:15px 0;border-bottom:1px solid #ffffff12;font-size:13px}.site-nav__mobile-cta{display:flex;justify-content:space-between;padding:17px 0 4px;color:var(--acid);font-size:12px;text-decoration:none}.site-header__actions{gap:14px}.header-cta{display:none}.menu-toggle{width:34px;height:34px;padding:9px 6px;display:flex;flex-direction:column;justify-content:center;gap:5px;border:1px solid var(--line);border-radius:3px;background:transparent}.menu-toggle span{width:100%;height:1px;background:var(--paper);transition:transform .2s}.menu-toggle[aria-expanded=true] span:first-child{transform:translateY(3px) rotate(45deg)}.menu-toggle[aria-expanded=true] span:last-child{transform:translateY(-3px) rotate(-45deg)}}
</style>
