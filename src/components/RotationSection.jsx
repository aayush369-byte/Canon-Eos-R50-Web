import React, { useRef } from 'react'
import { VideoWithFallback } from './Media.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function RotationSection() {
  const videoWrapRef = useRef(null)

  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger, prefersReducedMotion }) => {
    if (prefersReducedMotion) return
    gsap.fromTo(
      videoWrapRef.current,
      { scale: 1.04, opacity: 0.6 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 30%', scrub: true }
      }
    )
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%' } }
    )
  }, [])

  return (
    <section ref={ref} className="relative bg-black py-24 md:py-32 px-6 md:px-10 overflow-hidden" aria-labelledby="rotation-heading">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10 md:mb-14 text-center" data-reveal>
          <h2 id="rotation-heading" className="font-display font-light text-3xl md:text-5xl tracking-tightest text-paper text-balance">
            See it from every angle
          </h2>
          <p className="mt-3 text-paper-dim text-sm md:text-base">A full 180° turn around the EOS R50.</p>
        </div>

        <div ref={videoWrapRef} className="relative rounded-sm overflow-hidden border border-ink-line" data-reveal>
          <div className="absolute inset-0 vignette pointer-events-none z-10" aria-hidden="true" />
          <VideoWithFallback
            src="/assets/180-view/Canon_EOS_R50_180_View.mp4"
            poster="/assets/hero/00_Hero_EOS_R50.png"
            className="relative w-full aspect-video bg-ink-charcoal"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="180 degree rotating view of the Canon EOS R50"
          />
        </div>
      </div>
    </section>
  )
}
