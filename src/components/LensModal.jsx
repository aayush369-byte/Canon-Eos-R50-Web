import React, { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './Media.jsx'
import { lensesPath } from '../data/lenses.js'
import gsap from 'gsap'

export default function LensModal({ lens, onClose, onPrev, onNext, returnFocusRef }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      returnFocusRef?.current?.focus()
    }
  }, [returnFocusRef])

  useEffect(() => {
    if (!panelRef.current) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
    )
  }, [lens.id])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
    if (e.key !== 'Tab' || !panelRef.current) return

    const focusable = panelRef.current.querySelectorAll('button:not([disabled])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lens-modal-heading"
      aria-describedby="lens-modal-description"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-5xl bg-gradient-to-b from-ink-soft to-ink border border-ink-line rounded-sm overflow-hidden
                   grid grid-cols-1 md:grid-cols-2 max-h-[88vh]"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close lens details"
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-ink/70 border border-ink-line
                     text-paper hover:bg-canon-red hover:border-canon-red transition-colors"
        >
          <X size={18} />
        </button>

        <div className="relative bg-ink-charcoal flex items-center justify-center p-10 md:p-16">
          <div className="absolute inset-0 vignette pointer-events-none" aria-hidden="true" />
          <ImageWithFallback
            src={`${lensesPath}${lens.file}`}
            alt={`${lens.name} lens, full product view`}
            className="relative w-full aspect-square"
            imgClassName="w-full h-full object-contain"
            eager
          />
        </div>

        <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 overflow-y-auto">
          <p className="text-canon-red text-xs tracking-[0.22em] uppercase mb-3">{lens.mount} MOUNT · {lens.type}</p>
          <h3 id="lens-modal-heading" className="font-display font-light text-3xl md:text-4xl text-paper text-balance leading-tight">
            {lens.name}
          </h3>

          <div className="mt-8 grid grid-cols-2 gap-6 max-w-xs">
            <div>
              <p className="text-paper-mute text-[11px] tracking-[0.18em] uppercase">Focal Length</p>
              <p className="mt-1 font-display text-2xl text-paper">{lens.focal}</p>
            </div>
            <div>
              <p className="text-paper-mute text-[11px] tracking-[0.18em] uppercase">Max Aperture</p>
              <p className="mt-1 font-display text-2xl text-paper">{lens.aperture}</p>
            </div>
          </div>

          <p id="lens-modal-description" className="mt-8 text-paper-dim text-sm leading-relaxed max-w-sm">{lens.description}</p>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center gap-2 border border-ink-line px-5 py-3 text-xs tracking-[0.15em] uppercase text-paper-dim
                         hover:border-canon-red hover:text-paper transition-colors"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 border border-ink-line px-5 py-3 text-xs tracking-[0.15em] uppercase text-paper-dim
                         hover:border-canon-red hover:text-paper transition-colors"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
