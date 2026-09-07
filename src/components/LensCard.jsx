import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ImageWithFallback } from './Media.jsx'
import { lensesPath } from '../data/lenses.js'

export default function LensCard({ lens, onSelect }) {
  return (
    <article className="group flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] snap-start">
      <button
        type="button"
        onClick={(event) => onSelect(lens, event.currentTarget)}
        aria-label={`View details for ${lens.name}`}
        className="block w-full text-left"
      >
        <ImageWithFallback
          src={`${lensesPath}${lens.file}`}
          alt={`${lens.name} lens`}
          className="w-full aspect-[4/5] bg-ink-charcoal border border-ink-line group-hover:border-canon-red/60 transition-colors duration-300"
          imgClassName="w-full h-full object-contain p-8 transition-transform duration-500 ease-cinematic group-hover:scale-[1.04]"
        />
        <div className="mt-4">
          <p className="text-paper-mute text-[11px] tracking-[0.18em] uppercase">{lens.type}</p>
          <h3 className="mt-1.5 font-display text-paper text-base leading-snug">{lens.name}</h3>
          <div className="mt-2 flex items-center gap-3 text-xs text-paper-dim">
            <span>{lens.focal}</span>
            <span className="w-1 h-1 rounded-full bg-ink-line" aria-hidden="true" />
            <span>{lens.aperture}</span>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-canon-red tracking-wide">
            Explore <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
    </article>
  )
}
