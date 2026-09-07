import React, { useRef } from 'react'
import { VideoWithFallback } from './Media.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function UnboxingSection() {
  const wrapRef = useRef(null)

  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger, prefersReducedMotion }) => {
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%' } }
    )
    if (!prefersReducedMotion) {
      gsap.fromTo(
        wrapRef.current,
        { scale: 0.96, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 40%', scrub: true } }
      )
    }
  }, [])

  return (
    <section ref={ref} className="relative bg-ink py-24 md:py-36 px-6 md:px-10" aria-labelledby="unboxing-heading">
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="max-w-2xl mx-auto mb-12 md:mb-16" data-reveal>
          <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-4">First moments</p>
          <h2 id="unboxing-heading" className="font-display font-light text-4xl md:text-6xl tracking-tightest text-paper text-balance">
            Unbox the experience.
          </h2>
        </div>

        <div ref={wrapRef} className="relative rounded-sm overflow-hidden border border-ink-line" data-reveal>
          <VideoWithFallback
            src="/assets/unboxing/Canon_EOS_R50_Unboxing.mp4"
            poster="/assets/hero/00_Hero_EOS_R50.png"
            className="relative w-full aspect-video bg-ink-charcoal"
            label="Unboxing video of the Canon EOS R50"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Unboxing video of the Canon EOS R50"
          />
        </div>
      </div>
    </section>
  )
}
