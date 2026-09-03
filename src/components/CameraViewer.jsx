import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cameraViews, cameraViewsPath } from '../data/cameraViews.js'
import { ImageWithFallback } from './Media.jsx'

const DRAG_THRESHOLD = 40

export default function CameraViewer() {
  const [index, setIndex] = useState(0)
  const dragState = useRef({ startX: 0, dragging: false })
  const trackRef = useRef(null)

  const total = cameraViews.length

  const goTo = useCallback((next) => {
    setIndex(((next % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Keyboard navigation
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onPointerDown = (e) => {
    dragState.current = { startX: e.clientX, dragging: true }
  }
  const onPointerMove = (e) => {
    if (!dragState.current.dragging) return
  }
  const onPointerUp = (e) => {
    if (!dragState.current.dragging) return
    const dx = e.clientX - dragState.current.startX
    if (dx > DRAG_THRESHOLD) prev()
    else if (dx < -DRAG_THRESHOLD) next()
    dragState.current.dragging = false
  }

  const view = cameraViews[index]

  return (
    <div className="w-full">
      {/* Main viewer stage */}
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`Camera view ${index + 1} of ${total}: ${view.label}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="relative select-none cursor-grab active:cursor-grabbing bg-gradient-to-b from-ink-charcoal to-ink rounded-sm
                   border border-ink-line overflow-hidden aspect-[4/3] md:aspect-[16/9] max-h-[70vh] mx-auto touch-pan-y"
      >
        <div className="absolute inset-0 vignette pointer-events-none z-10" aria-hidden="true" />

        {cameraViews.map((v, i) => (
          <ImageWithFallback
            key={v.id}
            src={`${cameraViewsPath}${v.file}`}
            alt={v.alt}
            className={`absolute inset-0 transition-opacity duration-500 ease-cinematic ${i === index ? 'opacity-100 z-[5]' : 'opacity-0 hidden pointer-events-none'}`}
            imgClassName="w-full h-full object-contain p-8 md:p-14"
            eager={i === 0}
          />
        ))}

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous angle"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center
                     rounded-full bg-ink/60 backdrop-blur border border-ink-line text-paper hover:bg-canon-red hover:border-canon-red transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next angle"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center
                     rounded-full bg-ink/60 backdrop-blur border border-ink-line text-paper hover:bg-canon-red hover:border-canon-red transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Current label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-ink/70 backdrop-blur border border-ink-line">
          <span className="text-canon-red text-xs font-medium tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-paper-mute text-xs">/</span>
          <span className="text-paper-mute text-xs tabular-nums">{String(total).padStart(2, '0')}</span>
          <span className="w-px h-3 bg-ink-line mx-1" aria-hidden="true" />
          <span className="text-paper text-xs tracking-wide">{view.label}</span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar px-1 pb-1" role="tablist" aria-label="Camera angle thumbnails">
        {cameraViews.map((v, i) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={v.label}
            onClick={() => goTo(i)}
            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border transition-all duration-300
                        ${i === index ? 'border-canon-red opacity-100' : 'border-ink-line opacity-50 hover:opacity-80'}`}
          >
            <ImageWithFallback
              src={`${cameraViewsPath}${v.file}`}
              alt=""
              className="absolute inset-0"
              imgClassName="w-full h-full object-cover"
              label=""
            />
          </button>
        ))}
      </div>
    </div>
  )
}
