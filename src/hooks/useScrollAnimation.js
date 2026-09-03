import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollAnimation
 * Runs a GSAP animation callback scoped to a ref, wired to ScrollTrigger,
 * and automatically respects prefers-reduced-motion.
 *
 * @param {(ctx: { el: HTMLElement, prefersReducedMotion: boolean }) => void} callback
 * @param {any[]} deps
 */
export function useScrollAnimation(callback, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const ctx = gsap.context(() => {
      callback({ el, prefersReducedMotion, gsap, ScrollTrigger })
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

export default useScrollAnimation
