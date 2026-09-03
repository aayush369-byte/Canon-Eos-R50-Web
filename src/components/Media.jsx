import React, { useState, forwardRef } from 'react'
import { Camera, Video } from 'lucide-react'

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
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-ink-charcoal border border-ink-line text-paper-mute ${className}`}
        role="img"
        aria-label={label}
      >
        <Video size={28} strokeWidth={1.25} aria-hidden="true" />
        <span className="text-xs tracking-wide uppercase">{label}</span>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      onError={() => setFailed(true)}
      {...rest}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded video.
    </video>
  )
}
