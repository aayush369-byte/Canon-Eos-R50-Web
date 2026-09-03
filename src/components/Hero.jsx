import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { ImageWithFallback } from './Media.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const glowRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      // Entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(textRef.current.children, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 })
        .fromTo(imageRef.current, { opacity: 0, scale: 1.06, x: 24 }, { opacity: 1, scale: 1, x: 0, duration: 1.3 }, '-=0.9')
        .fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 1.6 }, '-=1.1')

      if (!prefersReducedMotion) {
        // Subtle idle drift on the product image
        gsap.to(imageRef.current, {
          y: -10,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        })

        // Cinematic scroll-out transition
        gsap.fromTo(
          imageRef.current,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 1.12,
            y: 40,
            opacity: 0.25,
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
        gsap.to(textRef.current, {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '60% top',
            scrub: true
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-ink flex items-center"
      aria-label="Canon EOS R50 hero"
    >
      {/* Background gradient + vignette */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-soft via-ink to-black" />
        <div
          ref={glowRef}
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full opacity-0"
          style={{ background: 'radial-gradient(circle, rgba(224,32,43,0.14) 0%, rgba(224,32,43,0) 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 pt-20 md:pt-0">
        {/* Left: text */}
        <div ref={textRef} className="order-2 md:order-1 max-w-xl">
          <p className="text-canon-red text-xs md:text-sm tracking-[0.25em] uppercase mb-5">EOS R50</p>
          <h1 className="font-display font-light text-[13vw] leading-[0.95] md:text-7xl lg:text-8xl tracking-tightest text-paper text-balance">
            Create<br />without limits.
          </h1>
          <p className="mt-6 text-paper-dim text-base md:text-lg max-w-sm">
            Compact. Powerful. Creative.
          </p>
          <div className="mt-9">
            <a
              href="#angles"
              onClick={(e) => { e.preventDefault(); document.querySelector('#angles')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-3 border border-canon-red bg-canon-red/10 text-paper px-7 py-3.5 text-xs tracking-[0.15em] uppercase
                         hover:bg-canon-red transition-colors duration-300"
            >
              Explore EOS R50
            </a>
          </div>
        </div>

        {/* Right: product image */}
        <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
          <ImageWithFallback
            imgRef={imageRef}
            src="/assets/hero/00_Hero_EOS_R50.png"
            alt="Canon EOS R50 mirrorless camera, front-right three-quarter view"
            className="relative w-[85%] md:w-full max-w-[640px] aspect-[4/5] object-cover bg-none"
            imgClassName="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      <a
        href="#angles"
        onClick={(e) => { e.preventDefault(); document.querySelector('#angles')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-paper-mute hover:text-paper transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
