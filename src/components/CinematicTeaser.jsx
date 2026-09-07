import React, { useEffect, useRef, useState } from 'react'
import { LoaderCircle, Play, RefreshCw, Volume2, VolumeX, X } from 'lucide-react'
import gsap from 'gsap'
import { ImageWithFallback } from './Media.jsx'
import { useScrollAnimation } from '../hooks/useScrollAnimation.js'

const VIDEO_SRC = '/assets/video/canon-eos-r50-ad.mp4'
const POSTER_SRC = '/assets/video/canon-eos-r50-ad-poster.jpg'

export default function CinematicTeaser() {
  const [open, setOpen] = useState(false)
  const [muted, setMuted] = useState(false)
  const [status, setStatus] = useState('idle')
  const [attempt, setAttempt] = useState(0)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const videoRef = useRef(null)

  const ref = useScrollAnimation(({ el, gsap: scopedGsap, ScrollTrigger, prefersReducedMotion }) => {
    scopedGsap.fromTo(
      el.querySelectorAll('[data-reveal]'),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 78%' } }
    )
    if (!prefersReducedMotion) {
      scopedGsap.fromTo(
        el.querySelector('[data-poster]'),
        { scale: 1.04 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 35%', scrub: true } }
      )
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const video = videoRef.current
    if (video) {
      video.muted = muted
      video.play().catch(() => setStatus('needs-play'))
    }

    return () => {
      document.body.style.overflow = ''
      if (video) {
        video.pause()
        video.currentTime = 0
      }
      triggerRef.current?.focus()
    }
  }, [open, attempt])

  useEffect(() => {
    if (!open || !panelRef.current) return undefined
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined
    const context = gsap.context(() => {
      gsap.fromTo(panelRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
    }, panelRef)
    return () => context.revert()
  }, [open, attempt])

  const close = () => setOpen(false)

  const openPlayer = () => {
    setStatus('loading')
    setMuted(false)
    setOpen(true)
  }

  const retry = () => {
    setStatus('loading')
    setAttempt((value) => value + 1)
  }

  const toggleMute = () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    if (videoRef.current) videoRef.current.muted = nextMuted
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll('button:not([disabled])')
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

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-soft py-24 md:py-36 px-6 md:px-10" aria-labelledby="teaser-heading">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 text-center" data-reveal>
          <p className="text-canon-red text-xs tracking-[0.25em] uppercase mb-4">A short film</p>
          <h2 id="teaser-heading" className="font-display font-light text-4xl md:text-6xl tracking-tightest text-paper text-balance">
            In the details.
          </h2>
          <p className="mt-4 text-paper-dim text-base md:text-lg">A cinematic study of the EOS R50.</p>
        </div>

        <div className="relative max-w-5xl mx-auto overflow-hidden border border-ink-line rounded-sm bg-black" data-reveal>
          <div data-poster className="relative aspect-[4/3] overflow-hidden">
            <ImageWithFallback
              src={POSTER_SRC}
              alt="Still from a Canon EOS R50 promotional video showing a close-up of the camera and lens mount"
              className="absolute inset-0 h-full w-full"
              imgClassName="h-full w-full object-cover"
              eager
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" aria-hidden="true" />
            <button
              ref={triggerRef}
              type="button"
              onClick={openPlayer}
              aria-label="Play Canon EOS R50 promotional video"
              className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-canon-red bg-canon-red text-paper shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105 hover:bg-canon-deep focus-visible:scale-105"
            >
              <Play size={24} fill="currentColor" aria-hidden="true" />
            </button>
            <p className="absolute bottom-5 left-5 z-10 text-[10px] tracking-[0.2em] uppercase text-paper-mute">EOS R50 / 00:10</p>
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="teaser-modal-heading"
          aria-describedby="teaser-modal-description"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-8"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close video viewer"
            onClick={close}
          />
          <div ref={panelRef} className="relative z-10 w-full max-w-6xl">
            <div className="mb-4 flex items-start justify-between gap-6">
              <div>
                <p className="text-canon-red text-[11px] tracking-[0.22em] uppercase">A short film</p>
                <h2 id="teaser-modal-heading" className="mt-2 font-display text-2xl font-light text-paper md:text-3xl">In the details.</h2>
                <p id="teaser-modal-description" className="sr-only">A ten-second Canon EOS R50 promotional video with sound.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line bg-ink/80 text-paper transition-colors hover:border-canon-red hover:bg-canon-red"
                >
                  {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close promotional video"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line bg-ink/80 text-paper transition-colors hover:border-canon-red hover:bg-canon-red"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden border border-ink-line bg-black shadow-2xl">
              <video
                key={attempt}
                ref={videoRef}
                className="mx-auto block max-h-[calc(100vh-11rem)] w-auto max-w-full object-contain"
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                preload="none"
                playsInline
                controls
                muted={muted}
                onLoadedData={() => setStatus('ready')}
                onCanPlay={() => setStatus('ready')}
                onPlaying={() => setStatus('ready')}
                onError={() => setStatus('failed')}
              />
              {status === 'loading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45" role="status" aria-live="polite">
                  <LoaderCircle className="animate-spin text-canon-red" size={30} aria-hidden="true" />
                  <span className="sr-only">Loading video</span>
                </div>
              )}
              {status === 'needs-play' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                  <button type="button" onClick={() => videoRef.current?.play().catch(() => {})} className="inline-flex items-center gap-2 border border-canon-red bg-canon-red px-5 py-3 text-xs uppercase tracking-[0.15em] text-paper hover:bg-canon-deep">
                    <Play size={15} fill="currentColor" aria-hidden="true" />
                    Play with sound
                  </button>
                </div>
              )}
              {status === 'failed' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/75 px-6 text-center">
                  <img src={POSTER_SRC} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" aria-hidden="true" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-paper">The film could not load.</p>
                    <button type="button" onClick={retry} className="inline-flex items-center gap-2 border border-canon-red px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-paper hover:bg-canon-red">
                      <RefreshCw size={14} aria-hidden="true" />
                      Try again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
