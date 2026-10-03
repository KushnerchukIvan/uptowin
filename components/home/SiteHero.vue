<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GameWorld from '~/components/home/GameWorld.vue'

const root = ref<HTMLElement | null>(null)
const { t, locale } = useSiteI18n()
let context: gsap.Context | undefined

onMounted(() => {
  if (!root.value) return
  gsap.registerPlugin(ScrollTrigger)

  context = gsap.context(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })
    intro.fromTo('[data-hero-kicker]', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 })
      .fromTo('.hero-title__mask span', { yPercent: 115, rotate: 2 }, { yPercent: 0, rotate: 0, duration: reducedMotion ? 0.42 : 0.95, stagger: reducedMotion ? 0.06 : 0.15 }, '-=0.05')
      .fromTo('[data-hero-copy]', { autoAlpha: 0, y: 24, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.45')
      .fromTo('[data-hero-action]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1 }, '-=0.38')
      .fromTo('[data-hero-proof]', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.2')

    if (!reducedMotion) {
      gsap.to('.hero__grain', { backgroundPosition: '13% 81%', duration: 18, ease: 'none', repeat: -1, yoyo: true })
      gsap.to('[data-hero-parallax="title"]', {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.7 },
      })
      gsap.to('[data-hero-parallax="meta"]', {
        y: -28,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    }
  }, root.value)
})

onBeforeUnmount(() => context?.revert())
</script>

<template>
  <section
    id="home"
    ref="root"
    class="hero section-wrap"
    aria-labelledby="hero-title"
  >
    <div
      class="hero__grain"
      aria-hidden="true"
    />
    <div class="hero__layout">
      <div
        class="hero__content"
        data-hero-parallax="title"
      >
        <p
          class="eyebrow"
          data-hero-kicker
        >
          <span class="eyebrow__index">01 /</span><span class="signal-dot" />{{ t('hero.kicker') }}
        </p>
        <h1
          id="hero-title"
          class="hero-title"
        >
          <span class="hero-title__mask"><span>{{ t('hero.titleFirst') }}</span></span>
          <span class="hero-title__mask hero-title__mask--accent"><span>{{ t('hero.titleSecond') }}</span></span>
        </h1>
        <p
          class="hero__description"
          data-hero-copy
        >
          {{ t('hero.description') }}
        </p>
        <div class="hero__actions">
          <a
            class="button button--primary"
            data-hero-action
            href="#join"
          >
            <span>{{ t('hero.primaryAction') }}</span><span
              class="button__arrow"
              aria-hidden="true"
            >↗</span>
          </a>
          <a
            class="text-link"
            data-hero-action
            href="#features"
          ><span>{{ t('hero.secondaryAction') }}</span><span aria-hidden="true">↓</span></a>
        </div>
        <div
          class="hero__proof"
          data-hero-proof
          data-hero-parallax="meta"
        >
          <div
            class="proof-avatars"
            aria-hidden="true"
          >
            <span>U</span><span>✳</span><span>↗</span><b>+</b>
          </div>
          <p><strong>01</strong><span>{{ t('hero.players') }}</span></p>
          <span
            class="proof-divider"
            aria-hidden="true"
          />
          <p><strong>24<span class="proof-unit">/7</span></strong><span>{{ locale === 'uk' ? 'світу без пауз' : 'world without pause' }}</span></p>
        </div>
      </div>

      <div
        id="game"
        class="hero__world"
      >
        <GameWorld />
      </div>
    </div>
    <a
      class="scroll-note"
      href="#features"
    ><span class="scroll-note__line" /><span>{{ t('hero.scrollLabel') }}</span><span class="scroll-note__number">01 — 04</span></a>
  </section>
</template>

<style lang="scss" scoped>
.hero{position:relative;min-height:min(810px,calc(100svh - 82px));padding-top:44px;padding-bottom:64px;display:flex;align-items:center;border-bottom:1px solid var(--line);isolation:isolate}.hero__grain{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.28;background:radial-gradient(ellipse at 83% 44%,#94bc9d12 0,transparent 42%),radial-gradient(ellipse at 12% 81%,#d8e8c70a 0,transparent 36%);background-size:150% 150%;mask-image:linear-gradient(90deg,#000,transparent 85%)}.hero__layout{width:min(1440px,100%);margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;align-items:center;gap:2%;}.hero__content{position:relative;z-index:2;padding-top:10px}.eyebrow{display:flex;align-items:center;gap:9px;margin:0 0 25px;color:#bcc6bc;font-size:9px;font-weight:600;letter-spacing:.16em}.eyebrow__index{color:var(--acid);font-size:9px}.signal-dot{width:6px;height:6px;border-radius:50%;background:var(--acid);box-shadow:0 0 12px #ccf28c;animation:signal-pulse 2.4s ease-in-out infinite}.hero-title{margin:0;font-family:var(--font-display);font-size:clamp(64px,6.7vw,106px);font-weight:500;letter-spacing:-.085em;line-height:.92}.hero-title__mask{display:block;overflow:hidden;padding:0 .1em .12em;margin:0 -.1em -.12em}.hero-title__mask span{display:inline-block;white-space:nowrap;will-change:transform}.hero-title__mask--accent{color:var(--acid)}.hero__description{max-width:410px;margin:29px 0 0;color:#aab4ac;font-size:14px;line-height:1.85;letter-spacing:.005em}.hero__actions{display:flex;align-items:center;gap:28px;margin-top:31px}.button{min-height:48px;display:inline-flex;align-items:center;justify-content:space-between;gap:30px;padding:0 16px;border:1px solid transparent;border-radius:3px;color:var(--ink);font-size:11px;font-weight:600;text-decoration:none;transition:transform .25s,background .25s,border-color .25s}.button--primary{background:var(--acid)}.button--primary:hover{transform:translateY(-3px);background:#defba9;box-shadow:0 10px 38px #c9ef8232}.button__arrow{font-size:14px}.text-link{display:inline-flex;align-items:center;gap:12px;color:var(--paper);font-size:11px;text-decoration:none}.text-link span:last-child{color:var(--acid);transition:transform .2s}.text-link:hover span:last-child{transform:translateY(4px)}.hero__proof{display:flex;align-items:center;gap:14px;margin-top:53px}.proof-avatars{display:flex;align-items:center;padding-left:2px}.proof-avatars span,.proof-avatars b{width:27px;height:27px;margin-left:-3px;display:grid;place-items:center;border:1px solid #25312d;border-radius:50%;background:#121a18;color:var(--acid);font-family:var(--font-display);font-size:10px}.proof-avatars span:nth-child(2){color:#e3edce}.proof-avatars span:nth-child(3){color:#9cb2a0}.proof-avatars b{background:var(--acid);color:var(--ink);font-family:var(--font-body);font-size:9px}.hero__proof p{display:grid;gap:3px;margin:0;color:#8d9990;font-size:8px}.hero__proof p strong{color:var(--paper);font-family:var(--font-display);font-size:14px;font-weight:500;letter-spacing:-.02em}.proof-unit{color:var(--acid)}.proof-divider{width:1px;height:27px;margin:0 7px;background:var(--line)}.hero__world{position:relative;min-width:0}.scroll-note{position:absolute;left:var(--gutter);bottom:25px;display:flex;align-items:center;gap:12px;color:#8d9990;font-size:7px;letter-spacing:.16em;text-decoration:none}.scroll-note__line{width:27px;height:1px;background:var(--acid)}.scroll-note__number{margin-left:15px;color:#66716a;font-variant-numeric:tabular-nums}.section-wrap{padding-right:var(--gutter);padding-left:var(--gutter)}
@keyframes signal-pulse{0%,100%{opacity:.55;box-shadow:0 0 5px #ccf28c}50%{opacity:1;box-shadow:0 0 13px #ccf28c}}
@media(max-width:1000px){.hero{min-height:690px}.hero__layout{grid-template-columns:1fr 1fr;gap:0}.hero-title{font-size:clamp(62px,7.3vw,92px)}.hero__description{font-size:12px}.hero__proof{gap:9px}.hero__proof p{font-size:7px}.hero__world{margin-right:-6%}}
@media(max-width:800px){.hero{min-height:unset;padding-top:32px;padding-bottom:70px}.hero__layout{grid-template-columns:1fr;gap:2px}.hero__content{padding-top:4px}.hero-title{font-size:clamp(70px,13vw,110px)}.hero__description{max-width:460px;font-size:13px}.hero__world{grid-row:1;margin:0 auto -3px;width:min(100%,590px)}.hero__content{grid-row:2}.hero__proof{margin-top:31px}.scroll-note{bottom:23px}}
@media(max-width:480px){.hero{padding-top:22px;padding-bottom:69px}.eyebrow{margin-bottom:20px;font-size:8px}.hero-title{font-size:clamp(64px,15vw,80px)}.hero__description{margin-top:18px;font-size:12px;line-height:1.75}.hero__actions{gap:19px;margin-top:23px}.button{min-height:45px;padding:0 13px;gap:18px;font-size:10px}.text-link{gap:8px;font-size:10px}.hero__proof{margin-top:27px}.scroll-note{left:var(--gutter);font-size:6px}.scroll-note__number{margin-left:4px}}
</style>
