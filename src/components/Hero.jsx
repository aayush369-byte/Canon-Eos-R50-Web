import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(textRef.current?.children || [], { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 })
          .fromTo(mediaRef.current, { opacity: 0, scale: 1.08, x: 24 }, { opacity: 1, scale: 1, x: 0, duration: 1.2 }, '-=0.8')

        gsap.to(mediaRef.current, {
          y: -10,
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
            y: 30,
            opacity: 0.35,
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

        const handlePointerMove = (event) => {
          if (!sectionRef.current || !mediaRef.current) return
          const rect = sectionRef.current.getBoundingClientRect()
          const x = (event.clientX - rect.left) / rect.width - 0.5
          const y = (event.clientY - rect.top) / rect.height - 0.5

          gsap.to(mediaRef.current, {
            x: x * 28,
            y: y * 18,
            duration: 0.9,
            ease: 'power3.out'
          })
        }

        sectionRef.current?.addEventListener('pointermove', handlePointerMove)
        return () => sectionRef.current?.removeEventListener('pointermove', handlePointerMove)
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
          className="h-full w-full object-cover brightness-[1.12] contrast-[1.06]"
          src="/assets/video/canon-eos-r50-ad.mp4"
          poster="/assets/video/canon-eos-r50-ad-poster.jpg"
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Cinematic background video of the Canon EOS R50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.82)_0%,rgba(10,10,11,0.48)_38%,rgba(10,10,11,0.08)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/85 via-transparent to-[#0a0a0b]/45" />
        <div className="absolute inset-0 vignette" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 pt-24 md:px-10 md:pb-16 md:pt-24">
        <div ref={textRef} className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.24em] text-paper-mute">Creator kit</span>
          </div>

          <div className="mb-2 text-[11px] uppercase tracking-[0.32em] text-paper-mute">Canon</div>
          <h1 className="font-display leading-[0.82] tracking-tightest text-paper">
            <span className="block text-[12vw] font-light md:text-[4.8rem] lg:text-[6.4rem]">EOS</span>
            <span className="block text-[20vw] font-light md:text-[7.4rem] lg:text-[9.5rem]">R50</span>
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.26em] text-paper-mute">Think in motion. Create in full.</p>
          <p className="mt-5 max-w-lg text-base leading-7 text-paper-dim md:text-lg">
            Ready for still frames, cinematic video, and the creative flow between them — all in one compact body designed to move as fast as your ideas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#overview"
              onClick={(e) => { e.preventDefault(); document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center border border-canon-red bg-canon-red px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-canon-red/90"
            >
              Explore EOS R50
            </a>
            <a
              href="#short-film"
              onClick={(e) => { e.preventDefault(); document.querySelector('#short-film')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-paper-dim hover:bg-white/10"
            >
              Watch the film
            </a>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {[
              ['24.2MP', 'Sensor'],
              ['4K', 'Video'],
              ['30fps', 'Capture']
            ].map(([value, label]) => (
              <div key={label} className="meta-card">
                <p className="font-display text-2xl text-paper md:text-3xl">{value}</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-paper-mute">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a href="#overview" onClick={(e) => { e.preventDefault(); document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' }) }} className="hidden flex-col items-center gap-2 text-paper-mute transition-colors hover:text-paper md:flex" aria-label="Scroll to overview section">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
