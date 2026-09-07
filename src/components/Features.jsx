import React from 'react'
import { featureStats } from '../data/features.js'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function Features() {
  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger }) => {
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%' } }
    )
  }, [])

  return (
    <section id="features" ref={ref} className="relative bg-ink-soft py-24 md:py-32 px-6 md:px-10 border-y border-ink-line" aria-labelledby="features-heading">
      <div className="max-w-[1600px] mx-auto">
        <p id="features-heading" className="text-canon-red text-xs tracking-[0.25em] uppercase mb-10 md:mb-14 text-center" data-reveal>
          Featured
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
          {featureStats.map((stat) => (
            <div key={stat.label} className="text-center" data-reveal>
              <p className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-paper tracking-tightest">{stat.value}</p>
              <p className="mt-2 text-paper-mute text-[11px] md:text-xs tracking-[0.1em] uppercase px-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
