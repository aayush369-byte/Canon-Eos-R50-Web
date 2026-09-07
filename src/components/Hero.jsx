import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const mediaRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(textRef.current?.children || [], { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 })
          .fromTo(mediaRef.current, { opacity: 0, scale: 1.08, x: 24 }, { opacity: 1, scale: 1, x: 0, duration: 1.2 }, '-=0.8')
          .fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }, '-=1.1')

        gsap.to(mediaRef.current, {
          y: -8,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })

        gsap.fromTo(
          mediaRef.current,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 1.08,
            y: 28,
            opacity: 0.3,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-ink"
      aria-label="Canon EOS R50 hero"
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/assets/video/canon-eos-r50-ad.mp4"
          poster="/assets/video/canon-eos-r50-ad-poster.jpg"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Cinematic background video of the Canon EOS R50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/80 to-[#0a0a0b]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/10 to-[#0a0a0b]/80" />
        <div ref={glowRef} className="absolute right-[-10%] top-1/2 h-[60vw] w-[60vw] max-h-[900px] max-w-[900px] -translate-y-1/2 rounded-full opacity-0" style={{ background: 'radial-gradient(circle, rgba(224,32,43,0.18) 0%, rgba(224,32,43,0) 68%)' }} aria-hidden="true" />
        <div className="absolute inset-0 vignette" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] items-center gap-8 px-6 pb-20 pt-24 md:grid-cols-2 md:px-10 md:pb-0 md:pt-0">
        <div ref={textRef} className="max-w-xl md:order-1">
          <p className="mb-5 text-[11px] tracking-[0.24em] text-canon-red uppercase">EOS R50</p>
          <h1 className="font-display text-[13vw] font-light leading-[0.9] tracking-tightest text-paper md:text-6xl lg:text-8xl">
            Create without limits.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-paper-dim md:text-lg">
            Compact, responsive, and ready to move with you from the street to the studio.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#overview"
              onClick={(e) => { e.preventDefault(); document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center border border-canon-red bg-canon-red px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              Explore the camera
            </a>
            <a
              href="#specs"
              onClick={(e) => { e.preventDefault(); document.querySelector('#specs')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:border-paper-dim hover:bg-white/10"
            >
              View specs
            </a>
          </div>
        </div>

        <div ref={mediaRef} className="relative flex items-center justify-center md:order-2">
          <div className="relative w-[82%] max-w-[620px] rounded-[2rem] border border-white/10 bg-black/20 p-4 shadow-[0_40px_90px_rgba(0,0,0,0.55)] backdrop-blur-[2px] md:p-6">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#09090a]">
              <img
                src="/assets/hero/00_Hero_EOS_R50.png"
                alt="Canon EOS R50 camera body in a front-right three-quarter view"
                className="h-auto w-full object-contain"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#overview"
        onClick={(e) => { e.preventDefault(); document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper-mute transition-colors hover:text-paper md:flex"
        aria-label="Scroll to overview section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
