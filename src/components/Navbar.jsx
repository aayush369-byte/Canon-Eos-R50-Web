import React, { useEffect, useState, useCallback } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

const LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Camera', href: '#angles' },
  { label: 'Features', href: '#features' },
  { label: 'Lens', href: '#lenses' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Specs', href: '#specs' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : previousOverflow
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const handleNavClick = useCallback((href) => {
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-ink-line bg-ink/70 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }} className="group flex items-center gap-3" aria-label="Go to hero section">
          <span className="font-display text-sm font-semibold tracking-[0.16em] text-paper md:text-base">CANON</span>
          <span className="hidden text-paper-mute sm:inline">|</span>
          <span className="hidden font-display text-sm font-light tracking-tight text-paper-dim transition-colors group-hover:text-canon-red sm:inline md:text-base">EOS R50</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="relative py-2 text-[11px] uppercase tracking-[0.18em] text-paper-dim transition-colors hover:text-paper after:absolute after:-bottom-[1px] after:left-0 after:h-px after:w-0 after:bg-canon-red after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#specs"
            onClick={(e) => { e.preventDefault(); handleNavClick('#specs') }}
            className="hidden items-center gap-2 border border-canon-red/70 bg-canon-red/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-canon-red md:inline-flex"
          >
            Specs
            <ArrowRight size={14} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex items-center justify-center rounded-full border border-ink-line bg-ink/40 p-2 text-paper transition-colors hover:border-canon-red hover:text-canon-red md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-ink-line bg-ink/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {LINKS.map((link) => (
            <li key={link.href} className="border-b border-ink-line last:border-none">
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="block py-3 text-sm uppercase tracking-[0.18em] text-paper-dim transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
