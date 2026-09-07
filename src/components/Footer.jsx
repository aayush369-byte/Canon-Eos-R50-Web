import React from 'react'
const FOOTER_LINKS = [
  { label: 'Camera', href: '#angles' },
  { label: 'Lenses', href: '#lenses' },
  { label: 'Explore', href: '#inside' }
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

      </div>

      <div className="max-w-[1600px] mx-auto mt-10 pt-6 border-t border-ink-line">
        <p className="text-paper-mute text-[11px]">
          "Canon" and "EOS" are trademarks of Canon Inc., used here descriptively for a non-commercial showcase project.
        </p>
      </div>
    </footer>
  )
}
