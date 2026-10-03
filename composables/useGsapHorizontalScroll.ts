import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HorizontalScrollOptions {
  section: Ref<HTMLElement | null>
  viewport: Ref<HTMLElement | null>
  track: Ref<HTMLElement | null>
  progress: Ref<HTMLElement | null>
}

export function useGsapHorizontalScroll({ section, viewport, track, progress }: HorizontalScrollOptions) {
  let context: gsap.Context | undefined

  onMounted(() => {
    if (!section.value || !viewport.value || !track.value) return

    gsap.registerPlugin(ScrollTrigger)
    context = gsap.context(() => {
      gsap.matchMedia().add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
        const getDistance = () => Math.max(0, track.value!.scrollWidth - viewport.value!.clientWidth)

        gsap.to(track.value, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.value,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (!progress.value) return
              gsap.set(progress.value, { scaleX: self.progress })
              progress.value.setAttribute('aria-valuenow', String(Math.round(self.progress * 100)))
            },
            onRefresh: (self) => {
              if (!progress.value) return
              gsap.set(progress.value, { scaleX: self.progress })
              progress.value.setAttribute('aria-valuenow', String(Math.round(self.progress * 100)))
            },
          },
        })
      })
    }, section.value)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    void document.fonts.ready.then(() => ScrollTrigger.refresh())
  })

  onBeforeUnmount(() => context?.revert())
}
