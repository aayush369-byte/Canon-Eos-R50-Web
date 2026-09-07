import React, { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { lenses, lensCategories } from '../data/lenses.js'
import LensCard from './LensCard.jsx'
import LensModal from './LensModal.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

export default function LensGallery() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedLens, setSelectedLens] = useState(null)
  const returnFocusRef = useRef(null)
  const trackRef = useRef(null)

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return lenses
    return lenses.filter((l) => l.categories.includes(activeCategory))
  }, [activeCategory])

  const ref = useScrollAnimation(({ el, gsap, ScrollTrigger, prefersReducedMotion }) => {
    if (prefersReducedMotion) return
    gsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 75%' } }
    )
  }, [])

  const scrollByAmount = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  const handleSelect = (lens, trigger) => {
    returnFocusRef.current = trigger
    setSelectedLens(lens)
  }

  const closeModal = () => setSelectedLens(null)

  const stepModal = (dir) => {
    if (!selectedLens) return
    const currentIndex = lenses.findIndex((l) => l.id === selectedLens.id)
    const nextIndex = (currentIndex + dir + lenses.length) % lenses.length
    setSelectedLens(lenses[nextIndex])
  }

  return (
    <section id="lenses" ref={ref} className="relative bg-ink-soft py-24 md:py-36 px-6 md:px-10" aria-labelledby="lenses-heading">
      <div className="max-w-[1600px] mx-auto">
        <div className="max-w-2xl mb-10" data-reveal>
          <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-4">The RF & RF-S ecosystem</p>
          <h2 id="lenses-heading" className="font-display font-light text-4xl md:text-6xl tracking-tightest text-paper text-balance">
            Find the perfect angle.
          </h2>
          <p className="mt-4 text-paper-dim text-base md:text-lg">Choose the lens that matches the story you want to tell.</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2" data-reveal role="group" aria-label="Filter lenses by category">
          {lensCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase border transition-colors duration-300 ${
                activeCategory === cat
                  ? 'bg-canon-red border-canon-red text-paper'
                  : 'border-ink-line text-paper-dim hover:border-paper-mute hover:text-paper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative" data-reveal>
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-px-6 pb-4"
          >
            {filtered.map((lens) => (
              <LensCard key={lens.id} lens={lens} onSelect={handleSelect} />
            ))}
            {filtered.length === 0 && (
              <p className="text-paper-mute text-sm py-10">No lenses match this filter yet.</p>
            )}
          </div>

          <div className="hidden md:flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll lenses left"
              className="w-10 h-10 flex items-center justify-center border border-ink-line text-paper-dim hover:border-canon-red hover:text-paper transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll lenses right"
              className="w-10 h-10 flex items-center justify-center border border-ink-line text-paper-dim hover:border-canon-red hover:text-paper transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedLens && (
        <LensModal
          lens={selectedLens}
          onClose={closeModal}
          onPrev={() => stepModal(-1)}
          onNext={() => stepModal(1)}
          returnFocusRef={returnFocusRef}
        />
      )}
    </section>
  )
}
