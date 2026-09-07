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
    <section ref={ref} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black px-6 md:px-10" aria-labelledby="final-cta-heading">
      <div data-bg className="absolute inset-0">
        <ImageWithFallback
          src="/assets/hero/00_Hero_EOS_R50.png"
          alt="Canon EOS R50 mirrorless camera"
          className="absolute inset-0"
          imgClassName="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.25),rgba(10,10,11,0.9)_52%,rgba(10,10,11,1)_100%)]" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="luxury-panel mx-auto max-w-3xl text-center" data-reveal>
          <p className="text-canon-red text-[10px] tracking-[0.28em] uppercase mb-6">EOS R50</p>
          <h2 id="final-cta-heading" className="font-display font-light text-4xl sm:text-5xl md:text-7xl tracking-tightest text-paper text-balance">
            The next frame is yours.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-paper-dim md:text-lg">
            Built for creators who move between stories, details and motion without compromising the moment.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[9px] uppercase tracking-[0.2em] text-paper-mute" data-reveal>
            {['4K video', 'Dual Pixel AF', 'RF mount', 'Portable power'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" data-reveal>
            <button
              type="button"
              onClick={() => scrollTo('#angles')}
              className="premium-button premium-button-primary w-full sm:w-auto"
            >
              Explore EOS R50
            </button>
            <button
              type="button"
              onClick={() => scrollTo('#lenses')}
              className="premium-button premium-button-secondary w-full sm:w-auto"
            >
              Explore Lenses
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
