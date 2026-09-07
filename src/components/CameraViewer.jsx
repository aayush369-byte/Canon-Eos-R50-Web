import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { cameraViews, cameraViewsPath } from '../data/cameraViews.js'
import { ImageWithFallback } from './Media.jsx'

const DRAG_THRESHOLD = 36

export default function CameraViewer() {
  const [index, setIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const dragState = useRef({ startX: 0, dragging: false, interactionAt: 0 })
  const trackRef = useRef(null)

  const total = cameraViews.length

  const goTo = useCallback((next) => {
    setIndex(((next % total) + total) % total)
    dragState.current.interactionAt = Date.now()
  }, [total])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const timer = window.setInterval(() => {
      const now = Date.now()
      if (dragState.current.dragging || now - dragState.current.interactionAt < 2000) return
      setIndex((value) => (value + 1) % total)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [total])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onKey = (event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); next() }
      if (event.key === 'ArrowLeft') { event.preventDefault(); prev() }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture?.(event.pointerId)
    dragState.current = { startX: event.clientX, dragging: true, interactionAt: Date.now() }
    setDragging(true)
    setDragOffset(0)
  }

  const onPointerMove = (event) => {
    if (!dragState.current.dragging) return
    const offset = event.clientX - dragState.current.startX
    setDragOffset(offset)
  }

  const onPointerUp = (event) => {
    if (!dragState.current.dragging) return
    const dx = event.clientX - dragState.current.startX
    if (dx > DRAG_THRESHOLD) prev()
    else if (dx < -DRAG_THRESHOLD) next()
    dragState.current.dragging = false
    setDragging(false)
    setDragOffset(0)
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const view = cameraViews[index]

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label={`Camera view ${index + 1} of ${total}: ${view.label}`}
        aria-live="polite"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        className="relative mx-auto aspect-[4/3] max-h-[70vh] select-none overflow-hidden rounded-sm border border-ink-line bg-gradient-to-b from-ink-charcoal to-ink md:aspect-[16/9]"
      >
        <div className="pointer-events-none absolute inset-0 z-10 vignette" aria-hidden="true" />

        {cameraViews.map((v, i) => (
          <ImageWithFallback
            key={v.id}
            src={`${cameraViewsPath}${v.file}`}
            alt={v.alt}
            className={`absolute inset-0 transition-opacity duration-500 ease-cinematic ${i === index ? 'opacity-100 z-[5]' : 'opacity-0 pointer-events-none hidden'}`}
            imgClassName="h-full w-full object-contain p-8 md:p-14"
            eager={i <= 1}
            style={{ transform: dragging ? `translateX(${dragOffset * 0.12}px)` : 'translateX(0px)' }}
          />
        ))}

        <div className="absolute inset-x-0 top-4 z-20 flex items-center justify-between px-4 md:px-6">
          <div className="rounded-full border border-ink-line bg-ink/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-paper-dim backdrop-blur-sm">
            {dragging ? 'Dragging' : 'Drag to rotate'}
          </div>

          <button
            type="button"
            onClick={() => goTo(0)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-paper backdrop-blur-sm transition-colors hover:border-canon-red hover:text-canon-red"
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous angle"
          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-line bg-ink/60 text-paper backdrop-blur transition-colors hover:border-canon-red hover:bg-canon-red md:left-6"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next angle"
          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink-line bg-ink/60 text-paper backdrop-blur transition-colors hover:border-canon-red hover:bg-canon-red md:right-6"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-ink-line bg-ink/70 px-4 py-1.5 backdrop-blur-sm">
          <span className="text-xs font-medium text-canon-red tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-xs text-paper-mute">/</span>
          <span className="text-xs text-paper-mute tabular-nums">{String(total).padStart(2, '0')}</span>
          <span className="mx-1 h-3 w-px bg-ink-line" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-paper">{view.label}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-label="Rotation progress">
        {cameraViews.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-canon-red' : 'w-2.5 bg-ink-line hover:bg-paper-mute'}`}
            aria-label={`View ${item.label}, ${i + 1} of ${total}`}
            aria-pressed={i === index}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar px-1 pb-1" role="tablist" aria-label="Camera angle thumbnails">
        {cameraViews.map((v, i) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={v.label}
            onClick={() => goTo(i)}
            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm border transition-all duration-300 md:h-20 md:w-20 ${i === index ? 'border-canon-red opacity-100' : 'border-ink-line opacity-50 hover:opacity-80'}`}
          >
            <ImageWithFallback
              src={`${cameraViewsPath}${v.file}`}
              alt=""
              className="absolute inset-0"
              imgClassName="h-full w-full object-cover"
              label=""
              eager={i <= 1}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
