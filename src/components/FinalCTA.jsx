import React from 'react'
import { ImageWithFallback } from './Media.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function FinalCTA() {
  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger }) => {
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%' } }
    )
    gsap.fromTo(
      el.querySelector('[data-bg]'),
      { opacity: 0.5 },
      { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 20%', scrub: true } }
    )
  }, [])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center bg-black px-6 md:px-10 overflow-hidden" aria-labelledby="final-cta-heading">
      <div data-bg className="absolute inset-0">
        <ImageWithFallback
          src="/assets/hero/00_Hero_EOS_R50.png"
          alt="Canon EOS R50 mirrorless camera"
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-6" data-reveal>EOS R50</p>
        <h2 id="final-cta-heading" className="font-display font-light text-4xl sm:text-5xl md:text-7xl tracking-tightest text-paper text-balance" data-reveal>
          Create without limits.
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" data-reveal>
          <button
            type="button"
            onClick={() => scrollTo('#angles')}
            className="w-full sm:w-auto border border-canon-red bg-canon-red text-paper px-8 py-4 text-xs tracking-[0.15em] uppercase
                       hover:bg-canon-deep hover:border-canon-deep transition-colors duration-300"
          >
            Explore EOS R50
          </button>
          <button
            type="button"
            onClick={() => scrollTo('#lenses')}
            className="w-full sm:w-auto border border-ink-line text-paper px-8 py-4 text-xs tracking-[0.15em] uppercase
                       hover:border-paper transition-colors duration-300"
          >
            Explore Lenses
          </button>
        </div>
      </div>
    </section>
  )
}
