<script setup lang="ts">
import { A11y, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import FeatureCard from '~/components/home/FeatureCard.vue'
import { featureDefinitions } from '~/data/site'
import type { FeatureCardData } from '~/types/site'

const root = ref<HTMLElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const progress = ref<HTMLElement | null>(null)
const { t, locale } = useSiteI18n()
useGsapReveal(root)
useGsapHorizontalScroll({ section: root, viewport, track, progress })

const features = computed<FeatureCardData[]>(() => featureDefinitions.map(feature => ({
  ...feature,
  index: t(`features.items.${feature.id}.index`),
  title: t(`features.items.${feature.id}.title`),
  body: t(`features.items.${feature.id}.body`),
  tag: t(`features.items.${feature.id}.tag`),
})))

const pagination = { clickable: true, bulletClass: 'swiper-pagination-bullet', bulletActiveClass: 'swiper-pagination-bullet-active' }
</script>

<template>
  <section
    id="features"
    ref="root"
    class="feature-section section-wrap"
    aria-labelledby="features-title"
  >
    <div class="feature-section__inner">
      <div
        class="section-heading"
        data-reveal
      >
        <div class="section-heading__main">
          <p class="eyebrow">
            <span class="eyebrow__index">02 /</span><span class="signal-dot" />{{ t('features.eyebrow') }}
          </p>
          <h2 id="features-title">
            {{ t('features.title') }}
          </h2>
        </div>
        <p class="section-heading__description">
          {{ t('features.description') }}
        </p>
      </div>

      <div class="feature-carousel feature-carousel--desktop">
        <div
          ref="viewport"
          class="feature-carousel__viewport"
        >
          <div
            ref="track"
            class="feature-track"
          >
            <div
              v-for="feature in features"
              :key="feature.id"
              class="feature-track__slide"
            >
              <FeatureCard :feature="feature" />
            </div>
          </div>
        </div>
        <div class="feature-carousel__controls">
          <span>{{ locale === 'uk' ? 'ПРОКРУЧУЙ, ЩОБ ДОСЛІДИТИ' : 'SCROLL TO EXPLORE' }}</span>
          <div
            class="feature-carousel__progress"
            role="progressbar"
            :aria-label="locale === 'uk' ? 'Прогрес карток' : 'Feature cards progress'"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="0"
          >
            <span ref="progress" />
          </div>
          <span class="feature-carousel__counter">01 <i>—</i> 03 <b aria-hidden="true">↔</b></span>
        </div>
      </div>

      <div class="feature-carousel feature-carousel--touch">
        <Swiper
          class="feature-swiper"
          :modules="[A11y, Pagination]"
          :slides-per-view="1.08"
          :space-between="12"
          :breakpoints="{ 520: { slidesPerView: 1.45, spaceBetween: 14 }, 680: { slidesPerView: 1.8, spaceBetween: 16 } }"
          :pagination="pagination"
          :a11y="{ prevSlideMessage: 'Previous feature', nextSlideMessage: 'Next feature', paginationBulletMessage: 'Go to feature {{index}}' }"
          :grab-cursor="true"
          :speed="750"
        >
          <SwiperSlide
            v-for="feature in features"
            :key="feature.id"
          >
            <FeatureCard :feature="feature" />
          </SwiperSlide>
        </Swiper>
        <div class="feature-section__foot">
          <span>03 {{ locale === 'uk' ? 'МОЖЛИВОСТІ' : 'POSSIBILITIES' }}</span><span class="feature-section__rule" /><span>{{ locale === 'uk' ? 'ГОРТАЙ' : 'SWIPE TO EXPLORE' }} <b>↔</b></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.feature-section {
  position: relative;
  display: flex;
  min-height: 100svh;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 68px;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(180deg, #101514 0%, #111614 100%);
}

.feature-section::before {
  position: absolute;
  top: 0;
  right: var(--gutter);
  left: var(--gutter);
  height: 1px;
  background: linear-gradient(90deg, transparent, #c8ed922c, transparent);
  content: '';
}

.feature-section__inner {
  width: min(1440px, 100%);
  margin: 0 auto;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 50px;
  margin-bottom: 35px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 19px;
  color: #c4cec5;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.17em;
}

.eyebrow__index { color: var(--acid); }

.signal-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--acid);
  box-shadow: 0 0 10px #ccf28c;
}

.section-heading h2 {
  max-width: 780px;
  margin: 0;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: clamp(39px, 5vw, 68px);
  font-weight: 500;
  letter-spacing: -0.065em;
  line-height: 1.04;
}

.section-heading__description {
  max-width: 240px;
  margin: 0 0 5px;
  color: #9aa69c;
  font-size: 11px;
  line-height: 1.85;
}

.feature-carousel--desktop { display: block; }
.feature-carousel--touch { display: none; }
.feature-carousel__viewport { overflow: visible; }

.feature-track {
  display: flex;
  width: max-content;
  gap: 18px;
  will-change: transform;
}

.feature-track__slide {
  width: clamp(420px, 48vw, 650px);
  height: clamp(280px, 38vh, 360px);
  flex: none;
}

.feature-track__slide :deep(.feature-card) {
  height: 100%;
  min-height: 100%;
  padding: clamp(23px, 3vw, 36px);
}

.feature-carousel__controls {
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 26px;
  color: #89958b;
  font-size: 7px;
  letter-spacing: 0.16em;
}

.feature-carousel__progress {
  height: 1px;
  flex: 1;
  background: #c8ed9222;
}

.feature-carousel__progress span {
  display: block;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left center;
  background: var(--acid);
}

.feature-carousel__counter {
  color: var(--paper);
  font-size: 8px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.feature-carousel__counter i {
  padding: 0 5px;
  color: #7c887d;
  font-style: normal;
}

.feature-carousel__counter b {
  margin-left: 15px;
  color: var(--acid);
  font-size: 13px;
  font-weight: 400;
}

.feature-swiper {
  overflow: visible;
  padding-bottom: 40px;
}

.feature-swiper :deep(.swiper-pagination) {
  bottom: 0;
  text-align: left;
}

.feature-swiper :deep(.swiper-pagination-bullet) {
  width: 5px;
  height: 5px;
  margin: 0 6px 0 0;
  border-radius: 4px;
  background: #68766b;
  opacity: 0.65;
  transition: width 0.3s, background 0.3s, opacity 0.3s;
}

.feature-swiper :deep(.swiper-pagination-bullet-active) {
  width: 24px;
  background: var(--acid);
  opacity: 1;
}

.feature-section__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  color: #77847a;
  font-size: 7px;
  letter-spacing: 0.14em;
}

.feature-section__rule {
  height: 1px;
  flex: 1;
  background: #c8ed921d;
}

.feature-section__foot b {
  margin-left: 5px;
  color: var(--acid);
  font-size: 12px;
  font-weight: 400;
}

@media (max-width: 1000px) {
  .feature-section {
    padding-top: 86px;
    padding-bottom: 70px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 26px;
  }

  .section-heading h2 {
    max-width: 700px;
    font-size: clamp(43px, 6.4vw, 62px);
  }

  .section-heading__description { max-width: 390px; }

  .feature-track__slide {
    width: clamp(420px, 54vw, 560px);
    height: 320px;
  }
}

@media (max-width: 800px), (prefers-reduced-motion: reduce) {
  .feature-section {
    display: block;
    min-height: unset;
    padding-top: 88px;
    padding-bottom: 76px;
  }

  .feature-section__inner {
    padding-top: 0;
    padding-bottom: 0;
  }

  .feature-carousel--desktop { display: none; }
  .feature-carousel--touch { display: block; }
}

@media (max-width: 520px) {
  .feature-section {
    padding-top: 74px;
    padding-bottom: 68px;
  }

  .section-heading {
    gap: 13px;
    margin-bottom: 24px;
  }

  .section-heading h2 { font-size: clamp(42px, 10vw, 54px); }

  .feature-swiper :deep(.feature-card) {
    min-height: 260px;
    padding: 21px;
  }

  .feature-section__foot { font-size: 6px; }
}
</style>
