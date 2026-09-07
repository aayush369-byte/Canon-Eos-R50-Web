import React, { useState, forwardRef } from 'react'
import { Camera, Play, RefreshCw, Video } from 'lucide-react'

/**
 * ImageWithFallback
 * Always renders a positioned container (className) so layout never shifts,
 * with the <img> filling it (imgClassName). If the asset is missing/broken
 * it swaps in a clean placeholder instead of a broken-image icon.
 * `imgRef` forwards a ref to the underlying <img> for GSAP targeting.
 */
export const ImageWithFallback = forwardRef(function ImageWithFallback(
  { src, alt, className = '', imgClassName = '', label = 'Product image coming soon', imgRef, eager = false, ...rest },
  ref
) {
  const [failed, setFailed] = useState(false)

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {failed || !src ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-charcoal border border-ink-line text-paper-mute"
          role="img"
          aria-label={alt || label}
        >
          <Camera size={28} strokeWidth={1.25} aria-hidden="true" />
          <span className="text-xs tracking-wide uppercase text-center px-4">{label}</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={imgClassName}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          {...rest}
        />
      )}
    </div>
  )
})

/**
 * VideoWithFallback
 * Same idea, but for <video>: falls back to a placeholder card if the
 * source file 404s, instead of showing an empty black box.
 */
export function VideoWithFallback({ src, poster, className = '', label = 'Video coming soon', videoRef, ...rest }) {
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  const handleRef = (node) => {
    if (typeof videoRef === 'function') videoRef(node)
    else if (videoRef) videoRef.current = node
  }

  const retry = () => {
    setStatus('loading')
    setAttempt((value) => value + 1)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        key={`${src}-${attempt}`}
        ref={handleRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        onCanPlay={() => setStatus('ready')}
        onPlaying={() => setStatus('ready')}
        onError={() => setStatus('failed')}
        {...rest}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video.
      </video>

      {status !== 'ready' && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink-charcoal/95 px-6 text-center text-paper-mute"
          role={status === 'failed' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              aria-hidden="true"
            />
          )}
          <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center gap-3">
            {status === 'failed' ? <Video size={28} strokeWidth={1.25} aria-hidden="true" /> : <Play size={28} strokeWidth={1.25} aria-hidden="true" />}
            <span className="text-xs tracking-wide uppercase">{status === 'failed' ? `${label} unavailable` : 'Loading experience'}</span>
            {status === 'failed' && (
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-2 border border-canon-red px-4 py-2 text-[11px] tracking-[0.15em] uppercase text-paper transition-colors hover:bg-canon-red"
              >
                <RefreshCw size={14} aria-hidden="true" />
                Try again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
