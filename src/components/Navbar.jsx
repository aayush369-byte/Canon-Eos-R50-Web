import React, { useEffect, useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'EOS R50', href: '#hero' },
  { label: 'Camera', href: '#angles' },
  { label: 'Lenses', href: '#lenses' },
  { label: 'Explore', href: '#inside' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = useCallback((href) => {
    setOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-ink-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-20"
      >
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }} className="flex items-baseline gap-2 group">
          <span className="font-display font-semibold tracking-tight text-sm md:text-base text-paper">CANON</span>
          <span className="hidden sm:inline text-paper-mute text-sm">|</span>
          <span className="hidden sm:inline font-display font-light tracking-tight text-sm md:text-base text-paper-dim group-hover:text-canon-red transition-colors">
            EOS R50
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="relative text-[13px] tracking-[0.12em] uppercase text-paper-dim hover:text-paper transition-colors py-2
                           after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-canon-red
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex items-center gap-2 text-paper text-[13px] tracking-[0.12em] uppercase"
        >
          <span className="hidden sm:inline">Menu</span>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-cinematic bg-ink/95 backdrop-blur-md border-b border-ink-line ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="block py-3 text-sm tracking-[0.12em] uppercase text-paper-dim hover:text-canon-red transition-colors border-b border-ink-line last:border-none"
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
