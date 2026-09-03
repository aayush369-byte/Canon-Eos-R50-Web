import React from 'react'
import { Instagram, Youtube, Facebook } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Camera', href: '#angles' },
  { label: 'Lenses', href: '#lenses' },
  { label: 'Explore', href: '#inside' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Terms', href: '#terms' }
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-black border-t border-ink-line px-6 md:px-10 py-14" role="contentinfo">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        <div>
          <p className="font-display text-paper text-lg tracking-tight">Canon EOS R50</p>
          <p className="mt-2 text-paper-mute text-xs max-w-xs">
            An independent, fan-made product showcase built for portfolio purposes. Not an official Canon website.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className="text-paper-dim text-xs tracking-[0.1em] uppercase hover:text-canon-red transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram (placeholder link)" className="text-paper-mute hover:text-canon-red transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="YouTube (placeholder link)" className="text-paper-mute hover:text-canon-red transition-colors">
            <Youtube size={18} />
          </a>
          <a href="#" aria-label="Facebook (placeholder link)" className="text-paper-mute hover:text-canon-red transition-colors">
            <Facebook size={18} />
          </a>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-10 pt-6 border-t border-ink-line">
        <p className="text-paper-mute text-[11px]">
          "Canon" and "EOS" are trademarks of Canon Inc., used here descriptively for a non-commercial showcase project.
        </p>
      </div>
    </footer>
  )
}
