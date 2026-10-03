<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref<HTMLElement | null>(null)
const { t, locale } = useSiteI18n()
const { email, feedback, feedbackType, isSubmitting, submit } = useWaitlist()
let context: gsap.Context | undefined

onMounted(() => {
  if (!root.value) return
  gsap.registerPlugin(ScrollTrigger)
  context = gsap.context(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reducedMotion) {
      gsap.fromTo('.waitlist-panel__orb', { scale: 0.76, rotate: -12 }, {
        scale: 1.08,
        rotate: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'center center', scrub: 1 },
      })
      gsap.fromTo('.waitlist-panel__stamp', { rotate: -12, y: 15 }, {
        rotate: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.65)',
        scrollTrigger: { trigger: root.value, start: 'top 78%', once: true },
      })
    }
  }, root.value)
})

onBeforeUnmount(() => context?.revert())
</script>

<template>
  <section
    id="join"
    ref="root"
    class="waitlist-section section-wrap"
    aria-labelledby="waitlist-title"
  >
    <div class="waitlist-panel">
      <div
        class="waitlist-panel__orb"
        aria-hidden="true"
      >
        <span /><i />
      </div>
      <div class="waitlist-panel__content">
        <p class="eyebrow">
          <span class="eyebrow__index">04 /</span><span class="signal-dot" />{{ t('waitlist.eyebrow') }}
        </p>
        <h2 id="waitlist-title">
          {{ t('waitlist.title') }}
        </h2>
        <p class="waitlist-panel__description">
          {{ t('waitlist.description') }}
        </p>

        <form
          class="waitlist-form"
          @submit.prevent="submit"
        >
          <label
            class="sr-only"
            for="waitlist-email"
          >{{ t('waitlist.emailLabel') }}</label>
          <input
            id="waitlist-email"
            v-model="email"
            type="email"
            name="email"
            autocomplete="email"
            required
            :placeholder="t('waitlist.placeholder')"
            :aria-invalid="feedbackType === 'error'"
            aria-describedby="waitlist-feedback"
          >
          <button
            type="submit"
            :disabled="isSubmitting"
          >
            <span>{{ isSubmitting ? t('waitlist.submitting') : t('waitlist.action') }}</span>
            <span
              class="waitlist-form__arrow"
              aria-hidden="true"
            >↗</span>
          </button>
        </form>
        <p
          id="waitlist-feedback"
          class="waitlist-feedback"
          :class="`waitlist-feedback--${feedbackType}`"
          aria-live="polite"
        >
          {{ feedback }}
        </p>
        <p class="waitlist-panel__note">
          <span aria-hidden="true">✳</span>{{ locale === 'uk' ? 'ЖОДНОГО СПАМУ. ЛИШЕ НОВИНИ З ВСЕСВІТУ.' : 'NO SPAM. JUST SIGNALS FROM THE UNIVERSE.' }}
        </p>
      </div>
      <div
        class="waitlist-panel__stamp"
        aria-hidden="true"
      >
        <span>EARLY</span><strong>ACCESS</strong><i>U · 2026</i>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.waitlist-section{padding-top:112px;padding-bottom:110px}.waitlist-panel{position:relative;isolation:isolate;overflow:hidden;width:min(1440px,100%);min-height:410px;margin:auto;padding:clamp(36px,7vw,84px);display:flex;align-items:center;border:1px solid #d8ead21e;background:linear-gradient(110deg,#17201b 0%,#121817 57%,#111718 100%)}.waitlist-panel::before{position:absolute;inset:0;z-index:-1;content:"";background:linear-gradient(90deg,transparent 35%,#b5db9810 100%),repeating-linear-gradient(0deg,transparent 0 47px,#d8ead207 48px)}.waitlist-panel__content{position:relative;z-index:2;width:min(590px,72%)}.eyebrow{display:flex;align-items:center;gap:9px;margin:0 0 20px;color:#c4cec5;font-size:8px;font-weight:600;letter-spacing:.17em}.eyebrow__index{color:var(--acid)}.signal-dot{width:5px;height:5px;border-radius:50%;background:var(--acid);box-shadow:0 0 10px #ccf28c}.waitlist-panel h2{max-width:600px;margin:0;color:var(--paper);font-family:var(--font-display);font-size:clamp(42px,6vw,76px);font-weight:500;letter-spacing:-.07em;line-height:.98}.waitlist-panel__description{max-width:420px;margin:20px 0 23px;color:#a2afa4;font-size:12px;line-height:1.8}.waitlist-form{width:min(490px,100%);min-height:56px;display:flex;padding:4px;border:1px solid #d8ead233;background:#0d1211}.waitlist-form:focus-within{border-color:#c8ed9277;box-shadow:0 0 0 3px #c8ed920b}.waitlist-form input{width:100%;min-width:0;padding:0 13px;border:0;outline:0;background:transparent;color:var(--paper);font-size:11px}.waitlist-form input::placeholder{color:#76827a}.waitlist-form button{flex:none;min-width:160px;display:flex;align-items:center;justify-content:space-between;gap:17px;padding:0 13px;border:0;background:var(--acid);color:#172016;font-size:10px;font-weight:600;cursor:pointer;transition:background .2s}.waitlist-form button:hover{background:#ddf5ab}.waitlist-form button:disabled{opacity:.6;cursor:wait}.waitlist-form__arrow{font-size:15px}.waitlist-feedback{min-height:17px;margin:9px 0 0;color:transparent;font-size:10px}.waitlist-feedback--success{color:var(--acid)}.waitlist-feedback--error{color:#f09183}.waitlist-panel__note{display:flex;align-items:center;gap:7px;margin:11px 0 0;color:#76827a;font-size:7px;letter-spacing:.13em}.waitlist-panel__note span{color:var(--acid)}.waitlist-panel__orb{position:absolute;z-index:0;top:-32%;right:-5%;width:min(570px,50vw);aspect-ratio:1;border:1px solid #c8ed9215;border-radius:50%;transform:rotate(-18deg)}.waitlist-panel__orb::before,.waitlist-panel__orb::after{position:absolute;inset:12%;border:1px solid #c8ed9211;border-radius:50%;content:""}.waitlist-panel__orb::after{inset:25%;border-color:#c8ed921b}.waitlist-panel__orb span{position:absolute;top:7%;left:27%;width:8px;height:8px;border-radius:50%;background:var(--acid);box-shadow:0 0 20px 4px #c8ed9280}.waitlist-panel__orb i{position:absolute;right:12%;bottom:21%;width:5px;height:5px;border-radius:50%;background:#e0edcc}.waitlist-panel__stamp{position:absolute;right:10%;bottom:15%;width:100px;height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:1px solid #c8ed9255;border-radius:50%;color:var(--acid);transform:rotate(9deg)}.waitlist-panel__stamp::before{position:absolute;inset:6px;border:1px dashed #c8ed9244;border-radius:50%;content:""}.waitlist-panel__stamp span,.waitlist-panel__stamp i{font-size:7px;letter-spacing:.15em;font-style:normal}.waitlist-panel__stamp strong{font-family:var(--font-display);font-size:12px;letter-spacing:.07em}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
@media(max-width:800px){.waitlist-section{padding-top:82px;padding-bottom:80px}.waitlist-panel{min-height:420px;padding:34px 28px}.waitlist-panel__content{width:min(590px,100%)}.waitlist-panel__orb{top:-12%;right:-36%;width:410px;opacity:.65}.waitlist-panel__stamp{right:7%;bottom:8%;width:76px;height:76px;opacity:.75}.waitlist-panel__stamp strong{font-size:10px}.waitlist-panel__stamp span,.waitlist-panel__stamp i{font-size:6px}}
@media(max-width:520px){.waitlist-section{padding-top:62px;padding-bottom:60px}.waitlist-panel{min-height:410px;padding:34px 20px 45px}.waitlist-panel h2{font-size:clamp(42px,11vw,58px)}.waitlist-panel__description{font-size:11px}.waitlist-form{min-height:unset;flex-direction:column;gap:4px;border:0;background:transparent}.waitlist-form input{height:48px;border:1px solid #d8ead233;background:#0d1211}.waitlist-form button{height:46px}.waitlist-panel__orb{top:14%;right:-66%;width:390px}.waitlist-panel__stamp{right:6%;bottom:9%;width:64px;height:64px}.waitlist-panel__stamp strong{font-size:8px}.waitlist-panel__stamp span,.waitlist-panel__stamp i{font-size:5px}.waitlist-panel__note{max-width:220px;font-size:6px}}
</style>
