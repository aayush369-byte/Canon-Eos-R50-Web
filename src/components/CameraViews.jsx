import React from 'react'
import CameraViewer from './CameraViewer.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function CameraViews() {
  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger, prefersReducedMotion }) => {
    if (prefersReducedMotion) return
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' }
      }
    )
  }, [])

  return (
    <section id="angles" ref={ref} className="relative bg-ink py-24 md:py-36 px-6 md:px-10" aria-labelledby="angles-heading">
      <div className="max-w-[1600px] mx-auto">
        <div className="max-w-2xl mb-14 md:mb-20" data-reveal>
          <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-4">See it from every angle</p>
          <h2 id="angles-heading" className="font-display font-light text-4xl md:text-6xl tracking-tightest text-paper text-balance">
            EOS R50
          </h2>
          <p className="mt-4 text-paper-dim text-base md:text-lg">12 perspectives. One camera.</p>
        </div>

        <div data-reveal>
          <CameraViewer />
        </div>

        <p className="mt-6 text-center text-paper-mute text-xs tracking-wide" data-reveal>
          Drag, use the arrows, or select a thumbnail to rotate the view.
        </p>
      </div>
    </section>
  )
}
