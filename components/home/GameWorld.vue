<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const root = ref<HTMLElement | null>(null)
const { t, locale } = useSiteI18n()
let context: gsap.Context | undefined

onMounted(() => {
  if (!root.value) return
  gsap.registerPlugin(ScrollTrigger)
  context = gsap.context(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
    entrance.fromTo('.world-visual', { autoAlpha: 0, scale: 0.83, rotate: -8 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.45 })
      .fromTo('.world-marker', { autoAlpha: 0, y: 20, filter: 'blur(6px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.65, stagger: 0.17 }, '-=0.8')

    if (!reducedMotion) {
      gsap.to('.world-planet', { y: -13, rotate: 1.5, duration: 4.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.world-orbit--outer', { rotate: '+=11', duration: 24, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.world-orbit--inner', { rotate: '-=14', duration: 30, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.world-satellite', { rotate: 360, transformOrigin: '400px 350px', duration: 34, ease: 'none', repeat: -1 })
      gsap.to('.world-marker--online', { y: -7, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.world-marker--reward', { y: 6, duration: 3.1, delay: 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.world-star', { scale: 1.8, opacity: 0.35, duration: 1.4, stagger: { each: 0.2, from: 'random', repeat: -1, yoyo: true }, transformOrigin: 'center', ease: 'sine.inOut' })
      gsap.to('.world-visual', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    }
  }, root.value)
})

onBeforeUnmount(() => context?.revert())
</script>

<template>
  <div
    ref="root"
    class="game-world"
    role="img"
    :aria-label="locale === 'uk' ? 'Планета Аурелія з кільцями та супутниками' : 'Aurelia, a ringed planet with orbiting satellites'"
  >
    <div
      class="world-grid"
      aria-hidden="true"
    />
    <div
      class="world-coordinate world-coordinate--top"
      aria-hidden="true"
    >
      37° 14′ 08.2″ N<br>SECTOR 07 / AURELIA
    </div>
    <div
      class="world-coordinate world-coordinate--bottom"
      aria-hidden="true"
    >
      UPTOWIN EXPLORATION PROGRAM<br>EST. 2089
    </div>

    <div
      class="world-visual"
      aria-hidden="true"
    >
      <svg
        class="world-svg"
        viewBox="0 0 800 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="planetSurface"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(320 315 -315 320 300 235)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#E9F5BF" /><stop
              offset=".23"
              stop-color="#B2C789"
            /><stop
              offset=".55"
              stop-color="#65866F"
            /><stop
              offset=".78"
              stop-color="#304E57"
            /><stop
              offset="1"
              stop-color="#111C27"
            />
          </radialGradient>
          <linearGradient
            id="planetShade"
            x1="540"
            x2="190"
            y1="245"
            y2="510"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stop-color="#101622"
              stop-opacity="0"
            /><stop
              offset=".62"
              stop-color="#101622"
              stop-opacity=".15"
            /><stop
              offset="1"
              stop-color="#08131D"
              stop-opacity=".85"
            />
          </linearGradient>
          <linearGradient
            id="ringLight"
            x1="132"
            x2="706"
            y1="420"
            y2="323"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stop-color="#91AA8B"
              stop-opacity=".12"
            /><stop
              offset=".42"
              stop-color="#DDF0B9"
            /><stop
              offset=".64"
              stop-color="#76968D"
            /><stop
              offset="1"
              stop-color="#CEE5B7"
              stop-opacity=".2"
            />
          </linearGradient>
          <radialGradient
            id="moonSurface"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="matrix(39 0 0 39 555 138)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#F1F2D8" /><stop
              offset=".68"
              stop-color="#B8C4A2"
            /><stop
              offset="1"
              stop-color="#6A7E75"
            />
          </radialGradient>
          <filter
            id="planetGlow"
            width="1.7"
            height="1.7"
            x="-.35"
            y="-.35"
            color-interpolation-filters="sRGB"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur stdDeviation="35" />
          </filter>
          <filter
            id="starGlow"
            width="3"
            height="3"
            x="-1"
            y="-1"
            color-interpolation-filters="sRGB"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="planetClip"><circle
            cx="400"
            cy="350"
            r="183"
          /></clipPath>
        </defs>

        <circle
          cx="400"
          cy="350"
          r="215"
          fill="#B4D98E"
          fill-opacity=".1"
          filter="url(#planetGlow)"
        />
        <ellipse
          class="world-orbit world-orbit--outer"
          cx="400"
          cy="350"
          rx="338"
          ry="134"
          transform="rotate(-23 400 350)"
          stroke="#D7EDCA"
          stroke-opacity=".3"
          stroke-width=".8"
        />
        <ellipse
          class="world-orbit world-orbit--inner"
          cx="400"
          cy="350"
          rx="270"
          ry="365"
          transform="rotate(29 400 350)"
          stroke="#D7EDCA"
          stroke-opacity=".12"
          stroke-width=".8"
          stroke-dasharray="2 7"
        />

        <g class="world-planet">
          <circle
            cx="400"
            cy="350"
            r="183"
            fill="url(#planetSurface)"
          />
          <g clip-path="url(#planetClip)">
            <path
              d="m181 397 66-35 41 18 46-61 45 51 45-92 51 73 54-31 79 77v161H181V397Z"
              fill="#D0DFA8"
              fill-opacity=".44"
            />
            <path
              d="m175 436 85-53 31 25 55-61 50 46 59-69 48 57 59-29 64 52v126H175V436Z"
              fill="#87A68B"
              fill-opacity=".74"
            />
            <path
              d="m181 477 77-43 45 16 47-37 45 25 59-42 49 39 45-19 78 46v107H181V477Z"
              fill="#496F72"
              fill-opacity=".92"
            />
            <path
              d="M153 504c72-32 105-24 147-43 64-29 101-19 149-41 55-25 112-8 198-42"
              stroke="#DDEBC2"
              stroke-opacity=".65"
              stroke-width="1.4"
            />
            <path
              d="M164 520c68-28 110-23 152-42 57-26 103-21 148-42 58-26 116-11 190-41"
              stroke="#DDEBC2"
              stroke-opacity=".3"
              stroke-width="1"
            />
            <ellipse
              cx="335"
              cy="296"
              rx="24"
              ry="8"
              transform="rotate(-19 335 296)"
              fill="#334E54"
              fill-opacity=".45"
            />
            <ellipse
              cx="464"
              cy="337"
              rx="17"
              ry="6"
              transform="rotate(14 464 337)"
              fill="#293F48"
              fill-opacity=".4"
            />
            <circle
              cx="400"
              cy="350"
              r="183"
              fill="url(#planetShade)"
            />
          </g>
          <circle
            cx="400"
            cy="350"
            r="183"
            stroke="#F0F4D7"
            stroke-opacity=".28"
          />
          <ellipse
            cx="400"
            cy="350"
            rx="242"
            ry="42"
            transform="rotate(-23 400 350)"
            stroke="url(#ringLight)"
            stroke-width="8"
          />
          <ellipse
            cx="400"
            cy="350"
            rx="246"
            ry="42"
            transform="rotate(-23 400 350)"
            stroke="#E4F0CF"
            stroke-opacity=".32"
            stroke-width="1"
          />
        </g>

        <circle
          cx="555"
          cy="138"
          r="37"
          fill="url(#moonSurface)"
        />
        <circle
          cx="544"
          cy="129"
          r="4"
          fill="#74877E"
          fill-opacity=".42"
        /><circle
          cx="568"
          cy="148"
          r="6"
          fill="#74877E"
          fill-opacity=".3"
        />
        <circle
          class="world-satellite"
          cx="400"
          cy="12"
          r="5"
          fill="#DFF5BA"
          filter="url(#starGlow)"
        />
        <path
          class="world-star"
          d="M159 268v12m-6-6h12"
          stroke="#DFF5BA"
          stroke-width="1.5"
        /><path
          class="world-star"
          d="M634 387v10m-5-5h10"
          stroke="#DFF5BA"
          stroke-width="1.5"
        /><path
          class="world-star"
          d="M237 539v8m-4-4h8"
          stroke="#DFF5BA"
          stroke-width="1.3"
        />
        <circle
          cx="605"
          cy="242"
          r="1.5"
          fill="#DFF5BA"
        /><circle
          cx="193"
          cy="363"
          r="1.5"
          fill="#DFF5BA"
        /><circle
          cx="521"
          cy="556"
          r="1.5"
          fill="#DFF5BA"
        /><circle
          cx="333"
          cy="90"
          r="1"
          fill="#DFF5BA"
        />
      </svg>
    </div>

    <div class="world-marker world-marker--online">
      <span class="online-indicator" />
      <span class="world-marker__copy"><span class="world-marker__label">{{ t('hero.onlineNow') }}</span><strong>{{ t('hero.onlineStatus') }}</strong></span>
      <span class="world-marker__index">LIVE</span>
    </div>
    <div class="world-marker world-marker--reward">
      <span class="reward-sigil">✳</span>
      <span class="world-marker__copy"><span class="world-marker__label">{{ t('hero.bonusLabel') }}</span><strong>{{ t('hero.bonus') }}</strong></span>
      <span
        class="reward-arrow"
        aria-hidden="true"
      >↗</span>
    </div>
    <span class="world-caption">{{ t('hero.artLabel') }}</span>
  </div>
</template>

<style lang="scss" scoped>
.game-world{position:relative;isolation:isolate;width:min(100%,650px);height:570px;margin:0 auto;display:grid;place-items:center}.world-grid{position:absolute;inset:7% 2%;z-index:-2;opacity:.22;background-image:linear-gradient(#cadaca0b 1px,transparent 1px),linear-gradient(90deg,#cadaca0b 1px,transparent 1px);background-size:46px 46px;mask-image:radial-gradient(ellipse,#000 8%,transparent 72%)}.world-visual{position:absolute;inset:0;display:grid;place-items:center;will-change:transform}.world-svg{width:100%;height:100%;overflow:visible}.world-orbit{transform-box:fill-box;transform-origin:center}.world-marker{position:absolute;z-index:3;display:flex;align-items:center;gap:12px;padding:13px 15px;border:1px solid #d8ead22a;background:rgba(13,19,19,.84);box-shadow:0 16px 42px #0005;backdrop-filter:blur(14px);will-change:transform,opacity}.world-marker--online{top:15%;left:0}.world-marker--reward{right:0;bottom:16%}.online-indicator{width:7px;height:7px;flex:none;border-radius:50%;background:var(--acid);box-shadow:0 0 12px var(--acid)}.world-marker__copy{display:grid;gap:6px}.world-marker__label{color:#9ca9a0;font-size:8px;letter-spacing:.13em}.world-marker__copy strong{color:var(--paper);font-size:12px;font-weight:500}.world-marker__copy small{color:var(--muted);font-size:9px;font-weight:400}.world-marker__index{align-self:start;margin-left:10px;color:#758179;font-size:7px;letter-spacing:.1em}.reward-sigil{width:28px;height:28px;display:grid;place-items:center;border:1px solid #d2ef8730;color:var(--acid);font-size:15px}.reward-arrow{margin-left:10px;color:var(--acid);font-size:13px}.world-coordinate,.world-caption{position:absolute;color:#85928a;font-size:7px;line-height:1.7;letter-spacing:.16em}.world-coordinate--top{top:7%;right:3%;text-align:right}.world-coordinate--bottom{bottom:8%;left:3%}.world-caption{bottom:2%;left:50%;white-space:nowrap;transform:translateX(-50%);font-size:8px;letter-spacing:.2em}.world-star{transform-box:fill-box;will-change:transform,opacity}
@media(max-width:1000px){.game-world{height:500px}.world-marker--online{left:1%}.world-marker--reward{right:1%}}
@media(max-width:800px){.game-world{width:min(100%,570px);height:clamp(340px,72vw,480px)}.world-coordinate{font-size:6px}.world-marker{padding:11px 12px;gap:9px}.world-marker__copy strong{font-size:10px}.world-marker__label{font-size:7px}}
@media(max-width:480px){.game-world{height:330px;margin:-12px auto 0}.world-visual{inset:0 -8%}.world-coordinate--top{top:1%;right:1%}.world-coordinate--bottom{bottom:4%;left:0}.world-marker--online{top:12%;left:-1%}.world-marker--reward{right:-1%;bottom:12%}.world-caption{bottom:-2%;font-size:7px}}
</style>
