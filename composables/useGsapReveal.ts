import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsapReveal(scope: Ref<HTMLElement | null>) {
  let animationContext: gsap.Context | undefined

  onMounted(() => {
    if (!scope.value) return

    gsap.registerPlugin(ScrollTrigger)
    animationContext = gsap.context(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: reducedMotion ? 8 : 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reducedMotion ? 0.3 : 0.78,
            ease: 'power3.out',
            clearProps: 'transform,opacity,visibility',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
    }, scope.value)
  })

  onBeforeUnmount(() => animationContext?.revert())
}
