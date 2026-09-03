import React, { useRef } from 'react'
import { ImageWithFallback } from './Media.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function ExplodedView() {
  const imgRef = useRef(null)

  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger, prefersReducedMotion }) => {
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%' } }
    )
    if (!prefersReducedMotion) {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08, y: 30 },
        { scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom top', scrub: true } }
      )
    }
  }, [])

  return (
    <section id="inside" ref={ref} className="relative bg-black py-24 md:py-36 px-6 md:px-10 overflow-hidden" aria-labelledby="inside-heading">
      <div className="max-w-[1600px] mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-12 md:mb-16" data-reveal>
          <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-4">Inside the EOS R50</p>
          <h2 id="inside-heading" className="font-display font-light text-4xl md:text-6xl tracking-tightest text-paper text-balance">
            Explore the architecture.
          </h2>
        </div>

        <div className="relative rounded-sm overflow-hidden border border-ink-line" data-reveal>
          <ImageWithFallback
            ref={imgRef}
            src="/assets/exploded-view/Canon_EOS_R50_Exploded_View.png"
            alt="Exploded technical view of the Canon EOS R50, showing internal component layout"
            className="w-full aspect-[16/10] md:aspect-[21/9] bg-ink-charcoal"
            imgClassName="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}
