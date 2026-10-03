<script setup lang="ts">
import type { FeatureCardData } from '~/types/site'

defineProps<{ feature: FeatureCardData }>()
</script>

<template>
  <article class="feature-card">
    <div class="feature-card__topline">
      <span class="feature-card__index">{{ feature.index }}</span>
      <span
        class="feature-card__glyph"
        aria-hidden="true"
      >
        <svg
          v-if="feature.icon === 'planet'"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="20"
            cy="20"
            r="8"
            stroke="currentColor"
          />
          <ellipse
            cx="20"
            cy="20"
            rx="16"
            ry="5.5"
            stroke="currentColor"
            transform="rotate(-25 20 20)"
          />
          <circle
            cx="28"
            cy="13"
            r="1.5"
            fill="currentColor"
          />
        </svg>
        <svg
          v-else-if="feature.icon === 'crew'"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle
            cx="15"
            cy="15"
            r="4"
            stroke="currentColor"
          /><circle
            cx="26"
            cy="15"
            r="4"
            stroke="currentColor"
          />
          <path
            d="M6 30c.7-4.2 3.7-6.4 8.8-6.4 5 0 8 2.2 8.7 6.4M20 30c.6-4.2 3.1-6.4 7.5-6.4 4.3 0 6.7 2.2 7.4 6.4"
            stroke="currentColor"
            stroke-linecap="round"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M30.8 16.2A11.5 11.5 0 0 0 10.4 12l-2.1 2.5M9.2 23.8A11.5 11.5 0 0 0 29.6 28l2.1-2.5"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.4 8.6v5.9h5.9M31.6 31.4v-5.9h-5.9"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="20"
            cy="20"
            r="2.2"
            fill="currentColor"
          />
        </svg>
      </span>
    </div>
    <div class="feature-card__body">
      <p class="feature-card__tag">
        <span />{{ feature.tag }}
      </p>
      <h3>{{ feature.title }}</h3>
      <p class="feature-card__description">
        {{ feature.body }}
      </p>
    </div>
    <span
      class="feature-card__corner"
      aria-hidden="true"
    >↗</span>
    <span
      class="feature-card__watermark"
      aria-hidden="true"
    >{{ feature.id === 'world' ? 'A' : feature.id === 'friends' ? 'C' : 'P' }}</span>
  </article>
</template>

<style lang="scss" scoped>
.feature-card{position:relative;min-height:295px;height:100%;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:25px 25px 24px;border:1px solid #d8ead21a;background:linear-gradient(150deg,#151c19,#101514 70%);transition:border-color .3s,transform .3s,background .3s}.feature-card::before{position:absolute;inset:0;content:"";opacity:0;background:radial-gradient(ellipse at 90% 4%,#c8ed9217,transparent 56%);transition:opacity .4s}.feature-card:hover{transform:translateY(-5px);border-color:#c8ed9255;background:#141c18}.feature-card:hover::before{opacity:1}.feature-card__topline,.feature-card__body{position:relative;z-index:1}.feature-card__topline{display:flex;align-items:flex-start;justify-content:space-between}.feature-card__index{color:#7e8c82;font-size:9px;letter-spacing:.14em}.feature-card__glyph{width:43px;height:43px;display:grid;place-items:center;border:1px solid #c8ed922d;color:var(--acid)}.feature-card__glyph svg{width:30px;height:30px}.feature-card__body{max-width:320px}.feature-card__tag{display:flex;align-items:center;gap:7px;margin:0 0 11px;color:#8d9c8e;font-size:7px;letter-spacing:.15em}.feature-card__tag span{width:4px;height:4px;border-radius:50%;background:var(--acid)}.feature-card h3{margin:0 0 11px;color:var(--paper);font-family:var(--font-display);font-size:clamp(22px,2.4vw,30px);font-weight:500;letter-spacing:-.05em}.feature-card__description{max-width:290px;margin:0;color:#9aa69c;font-size:11px;line-height:1.8}.feature-card__corner{position:absolute;z-index:1;right:24px;bottom:25px;color:var(--acid);font-size:15px;opacity:0;transform:translate(-5px,5px);transition:opacity .3s,transform .3s}.feature-card:hover .feature-card__corner{opacity:1;transform:translate(0)}.feature-card__watermark{position:absolute;right:-12px;bottom:-50px;color:#d5edc408;font-family:var(--font-display);font-size:185px;font-weight:500;line-height:1;pointer-events:none}
@media(max-width:650px){.feature-card{min-height:260px;padding:21px}.feature-card h3{font-size:26px}}
</style>
