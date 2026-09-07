import React, { useEffect, useMemo, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './Media.jsx'
import { lensesPath } from '../data/lenses.js'
import gsap from 'gsap'

const parseFocalRange = (focalValue) => {
  if (!focalValue) return null
  const match = focalValue.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/)
  if (!match) {
    const single = focalValue.match(/(\d+(?:\.\d+)?)/)
    if (!single) return null
    return { min: Number(single[1]), max: Number(single[1]) }
  }

  return { min: Number(match[1]), max: Number(match[2]) }
}

export default function LensModal({ lens, onClose, onPrev, onNext, returnFocusRef }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const focalRange = useMemo(() => parseFocalRange(lens.focal), [lens.focal])
  const [focalLength, setFocalLength] = useState(focalRange ? focalRange.min : null)

  useEffect(() => {
    setFocalLength(focalRange ? focalRange.min : null)
  }, [focalRange])

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

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }
    if (event.key === 'ArrowLeft') onPrev()
    if (event.key === 'ArrowRight') onNext()
    if (event.key !== 'Tab' || !panelRef.current) return

    const focusable = panelRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const focalPercent = focalRange && focalLength !== null ? ((focalLength - focalRange.min) / (focalRange.max - focalRange.min || 1)) * 100 : 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lens-modal-heading"
      aria-describedby="lens-modal-description"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div ref={panelRef} className="relative grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-sm border border-ink-line bg-gradient-to-b from-ink-soft to-ink md:grid-cols-2">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close lens details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ink-line bg-ink/70 text-paper transition-colors hover:border-canon-red hover:bg-canon-red"
        >
          <X size={18} />
        </button>

        <div className="relative flex items-center justify-center bg-ink-charcoal p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 vignette" aria-hidden="true" />
          <ImageWithFallback
            src={`${lensesPath}${lens.file}`}
            alt={`${lens.name} lens, full product view`}
            className="relative aspect-square w-full"
            imgClassName="h-full w-full object-contain"
            eager
          />
        </div>

        <div className="flex flex-col justify-center overflow-y-auto px-8 py-10 md:px-12 md:py-14">
          <p className="mb-3 text-xs tracking-[0.22em] text-canon-red uppercase">{lens.mount} MOUNT · {lens.type}</p>
          <h3 id="lens-modal-heading" className="font-display text-3xl font-light leading-tight text-paper md:text-4xl">
            {lens.name}
          </h3>

          <div className="mt-8 grid max-w-xs grid-cols-2 gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-paper-mute">Focal Length</p>
              <p className="mt-1 font-display text-2xl text-paper">{focalRange && focalLength !== null ? `${focalLength}mm` : lens.focal}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-paper-mute">Max Aperture</p>
              <p className="mt-1 font-display text-2xl text-paper">{lens.aperture}</p>
            </div>
          </div>

          {focalRange && focalLength !== null && (
            <div className="mt-8 max-w-sm">
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-paper-mute">
                <span>Zoom</span>
                <span>{focalLength}mm</span>
              </div>
              <input
                type="range"
                min={focalRange.min}
                max={focalRange.max}
                step={1}
                value={focalLength}
                onChange={(event) => setFocalLength(Number(event.target.value))}
                aria-label={`Adjust focal length for ${lens.name}`}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ink-line accent-canon-red"
              />
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.16em] text-paper-dim">
                <span>{focalRange.min}mm</span>
                <span>{focalRange.max}mm</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-line">
                <div className="h-full rounded-full bg-canon-red/80" style={{ width: `${Math.max(8, focalPercent)}%` }} aria-hidden="true" />
              </div>
            </div>
          )}

          <p id="lens-modal-description" className="mt-8 max-w-sm text-sm leading-relaxed text-paper-dim">{lens.description}</p>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center gap-2 border border-ink-line px-5 py-3 text-xs tracking-[0.15em] uppercase text-paper-dim transition-colors hover:border-canon-red hover:text-paper"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 border border-ink-line px-5 py-3 text-xs tracking-[0.15em] uppercase text-paper-dim transition-colors hover:border-canon-red hover:text-paper"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
