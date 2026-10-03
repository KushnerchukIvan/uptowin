<script setup lang="ts">
import { journeyStepIds } from '~/data/site'
import type { JourneyStepData } from '~/types/site'

const root = ref<HTMLElement | null>(null)
const { t, locale } = useSiteI18n()
useGsapReveal(root)

const steps = computed<JourneyStepData[]>(() => {
  return journeyStepIds.map(id => ({
    id,
    title: t(`how.steps.${id}.title`),
    body: t(`how.steps.${id}.body`),
  }))
})
</script>

<template>
  <section
    id="how"
    ref="root"
    class="journey-section section-wrap"
    aria-labelledby="journey-title"
  >
    <div class="journey-section__inner">
      <div
        class="journey-section__intro"
        data-reveal
      >
        <p class="eyebrow">
          <span class="eyebrow__index">03 /</span><span class="signal-dot" />{{ t('how.eyebrow') }}
        </p>
        <h2 id="journey-title">
          {{ t('how.title') }}
        </h2>
        <span
          class="journey-section__stamp"
          aria-hidden="true"
        ><span>U</span><i>™</i></span>
      </div>

      <ol class="journey-list">
        <li
          v-for="(step, index) in steps"
          :key="step.id"
          class="journey-step"
          data-reveal
        >
          <span class="journey-step__number">{{ step.id === 'character' ? '01' : step.id === 'crew' ? '02' : '03' }}</span>
          <span
            class="journey-step__connector"
            aria-hidden="true"
          ><span /></span>
          <div class="journey-step__copy">
            <p>{{ locale === 'uk' ? `КРОК 0${index + 1}` : `STEP 0${index + 1}` }}</p>
            <h3>{{ step.title }}</h3>
            <span>{{ step.body }}</span>
          </div>
          <span
            class="journey-step__arrow"
            aria-hidden="true"
          >↗</span>
        </li>
      </ol>
    </div>
    <div
      class="journey-section__watermark"
      aria-hidden="true"
    >
      GO FURTHER
    </div>
  </section>
</template>

<style lang="scss" scoped>
.journey-section{position:relative;overflow:hidden;padding-top:128px;padding-bottom:132px;border-bottom:1px solid var(--line)}.journey-section__inner{position:relative;z-index:1;width:min(1440px,100%);margin:auto;display:grid;grid-template-columns:.88fr 1.12fr;gap:10%}.eyebrow{display:flex;align-items:center;gap:9px;margin:0 0 21px;color:#c4cec5;font-size:8px;font-weight:600;letter-spacing:.17em}.eyebrow__index{color:var(--acid)}.signal-dot{width:5px;height:5px;border-radius:50%;background:var(--acid);box-shadow:0 0 10px #ccf28c}.journey-section__intro h2{max-width:460px;margin:0;color:var(--paper);font-family:var(--font-display);font-size:clamp(40px,5vw,67px);font-weight:500;letter-spacing:-.068em;line-height:1.06}.journey-section__stamp{width:46px;height:46px;margin-top:42px;display:grid;place-items:center;border:1px solid #c8ed923d;border-radius:50%;color:var(--acid);font-family:var(--font-display);font-size:14px}.journey-section__stamp i{position:absolute;margin:0 0 25px 36px;font-family:var(--font-body);font-size:7px;font-style:normal}.journey-list{margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}.journey-step{position:relative;min-height:126px;display:grid;grid-template-columns:40px 22px 1fr 20px;align-items:center;gap:14px;border-bottom:1px solid var(--line)}.journey-step__number{align-self:start;padding-top:29px;color:var(--acid);font-size:9px;letter-spacing:.12em}.journey-step__connector{height:100%;display:flex;justify-content:center;position:relative}.journey-step__connector::before{position:absolute;top:0;bottom:0;width:1px;background:#c8ed9223;content:""}.journey-step__connector span{position:relative;top:28px;width:5px;height:5px;border:1px solid var(--acid);border-radius:50%;background:var(--ink);box-shadow:0 0 10px #c8ed923a}.journey-step__copy p{margin:0 0 7px;color:#758278;font-size:7px;letter-spacing:.15em}.journey-step__copy h3{margin:0 0 7px;color:var(--paper);font-family:var(--font-display);font-size:19px;font-weight:500;letter-spacing:-.035em}.journey-step__copy>span{color:#9aa69c;font-size:10px;line-height:1.65}.journey-step__arrow{color:#718075;font-size:13px;transition:color .2s,transform .2s}.journey-step:hover .journey-step__arrow{color:var(--acid);transform:translate(2px,-2px)}.journey-section__watermark{position:absolute;bottom:-.27em;left:2%;color:#d2e9da04;font-family:var(--font-display);font-size:clamp(90px,19vw,250px);font-weight:600;letter-spacing:-.08em;line-height:1;white-space:nowrap;pointer-events:none}
@media(max-width:800px){.journey-section{padding-top:85px;padding-bottom:95px}.journey-section__inner{grid-template-columns:1fr;gap:38px}.journey-section__intro h2{max-width:510px;font-size:clamp(44px,8vw,62px)}.journey-section__stamp{display:none}.journey-step{min-height:112px;grid-template-columns:32px 16px 1fr 17px;gap:10px}.journey-step__copy h3{font-size:17px}.journey-section__watermark{font-size:24vw}}
</style>
