import React, { useRef } from 'react'
import { featureStories } from '../data/features.js'
import { cameraViewsPath } from '../data/cameraViews.js'
import { ImageWithFallback } from './Media.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

// Map each story beat to one of the existing camera-view photographs
// (no new/invented imagery — reusing the provided 12-angle set).
const STORY_IMAGES = {
  create: '08_Front_Right_3-4.jpg',
  focus: '02_Rear.jpg',
  video: '11_Low_Angle.jpg'
}

function StoryBlock({ story }) {
  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger, prefersReducedMotion }) => {
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 70%' } }
    )
    if (!prefersReducedMotion) {
      gsap.fromTo(
        el.querySelector('[data-parallax]'),
        { y: 40 },
        { y: -40, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
    }
  }, [story.id])

  const imageFirst = story.align === 'right'

  return (
    <section ref={ref} className="relative bg-ink py-20 md:py-32 px-6 md:px-10 overflow-hidden" aria-labelledby={`story-${story.id}`}>
      <div className={`max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center`}>
        <div className={`${imageFirst ? 'md:order-2' : 'md:order-1'}`} data-reveal>
          <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-4">{story.eyebrow}</p>
          <h2 id={`story-${story.id}`} className="font-display font-light text-3xl md:text-5xl tracking-tightest text-paper text-balance">
            {story.heading}
          </h2>
          <p className="mt-5 text-paper-dim text-base md:text-lg max-w-sm">{story.body}</p>
        </div>

        <div className={`relative ${imageFirst ? 'md:order-1' : 'md:order-2'}`} data-reveal>
          <div data-parallax className="overflow-hidden border border-ink-line bg-[#0b0b0d]">
            <ImageWithFallback
              src={`${cameraViewsPath}${STORY_IMAGES[story.id]}`}
              alt={`Canon EOS R50 — ${story.heading}`}
              className="relative aspect-[4/3] w-full bg-[#0b0b0d] md:aspect-[3/2]"
              imgClassName="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FeatureStory() {
  return (
    <>
      {featureStories.map((story) => (
        <StoryBlock key={story.id} story={story} />
      ))}
    </>
  )
}
