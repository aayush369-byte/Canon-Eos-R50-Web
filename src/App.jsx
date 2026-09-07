import React, { lazy, Suspense, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CameraViews from './components/CameraViews.jsx'
import Features from './components/Features.jsx'
import FeatureStory from './components/FeatureStory.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import { ImageWithFallback } from './components/Media.jsx'
import { featureStats } from './data/features.js'

const LensGallery = lazy(() => import('./components/LensGallery.jsx'))
const ExplodedView = lazy(() => import('./components/ExplodedView.jsx'))
const CinematicTeaser = lazy(() => import('./components/CinematicTeaser.jsx'))

function SectionFallback() {
  return <div className="min-h-40 bg-ink flex items-center justify-center text-paper-mute text-[10px] tracking-[0.2em] uppercase" aria-label="Loading section">Loading</div>
}

function OverviewSection() {
  const [architectureOpen, setArchitectureOpen] = useState(false)

  return (
    <section id="overview" className="relative border-y border-ink-line bg-ink-soft px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="section-kicker">Overview</p>
          <h2 className="max-w-xl font-display text-4xl font-light tracking-tight text-paper md:text-6xl">
            Ready for the way you create.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-paper-dim md:text-lg">
            Built for fast-moving creators, the EOS R50 packs a 24.2MP APS-C sensor, DIGIC X processing and responsive Dual Pixel CMOS AF II into a compact body that feels effortless to carry and even easier to shoot with.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {featureStats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="rounded border border-ink-line bg-ink px-4 py-5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="font-display text-3xl text-paper">{stat.value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-paper-mute">{stat.label}</p>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setArchitectureOpen(true)}
            className="group relative overflow-hidden rounded border border-ink-line bg-ink text-left transition-colors hover:border-canon-red/70 sm:col-span-3 lg:col-span-1 xl:col-span-3"
            aria-label="Open Inside the EOS R50 architecture view"
          >
            <img
              src="/assets/exploded-view/Canon_EOS_R50_Exploded_View.png"
              alt=""
              className="h-32 w-full object-cover object-center opacity-55 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-75"
              aria-hidden="true"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent" aria-hidden="true" />
            <span className="absolute inset-y-0 left-4 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-canon-red">Inside the EOS R50</span>
              <span className="mt-2 font-display text-2xl font-light text-paper">Explore the architecture.</span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.16em] text-paper-mute">Open view</span>
            </span>
          </button>
        </div>
      </div>

      {architectureOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-labelledby="architecture-modal-heading">
          <button
            type="button"
            onClick={() => setArchitectureOpen(false)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-ink-line bg-ink/80 text-paper transition-colors hover:border-canon-red hover:bg-canon-red"
            aria-label="Close architecture view"
          >
            <X size={18} />
          </button>
          <div className="w-full max-w-6xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-canon-red">Inside the EOS R50</p>
            <h2 id="architecture-modal-heading" className="mb-6 font-display text-3xl font-light text-paper md:text-5xl">Explore the architecture.</h2>
            <ImageWithFallback
              src="/assets/exploded-view/Canon_EOS_R50_Exploded_View.png"
              alt="Exploded technical view of the Canon EOS R50, showing internal component layout"
              className="max-h-[70vh] w-full border border-ink-line bg-ink-charcoal"
              imgClassName="h-full max-h-[70vh] w-full object-contain"
              eager
            />
          </div>
        </div>
      )}
    </section>
  )
}

function StoryGallery() {
  const images = [
    '/assets/camera-views/08_Front_Right_3-4.jpg',
    '/assets/camera-views/02_Rear.jpg',
    '/assets/camera-views/11_Low_Angle.jpg',
    '/assets/lenses/02_RF-S_18-150mm_f3.5-6.3_IS_STM.jpg'
  ]

  return (
    <section id="gallery" className="relative bg-ink px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Editorial gallery</p>
          <h2 className="font-display text-4xl font-light tracking-tight text-paper md:text-6xl">Frames that feel alive.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <figure className="group relative overflow-hidden md:col-span-2">
            <img src={images[0]} alt="Front-right three-quarter view of the EOS R50" className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[560px]" loading="lazy" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-sm text-paper opacity-0 transition duration-300 group-hover:opacity-100">Front-right hero angle</figcaption>
          </figure>
          <div className="grid gap-4">
            {images.slice(1).map((src, index) => (
              <figure key={src} className="group relative overflow-hidden">
                <img src={src} alt="EOS R50 detail view" className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-xs uppercase tracking-[0.18em] text-paper opacity-0 transition duration-300 group-hover:opacity-100">
                  {index === 0 ? 'Rear display' : index === 1 ? 'Low angle' : 'Travel zoom'}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecsSection() {
  const specs = [
    { label: 'Sensor', value: '24.2 Megapixel APS-C CMOS sensor' },
    { label: 'Processor', value: 'DIGIC X image processor' },
    { label: 'AF System', value: 'Dual Pixel CMOS AF II with subject detection' },
    { label: 'Video', value: '4K video, oversampled from 6K, uncropped, up to 30fps' },
    { label: 'Display', value: '3.0" fully articulated vari-angle touchscreen' },
    { label: 'Mount', value: 'RF lens mount with RF and RF-S compatibility' }
  ]

  const fullSpecs = [
    ['Continuous shooting', 'Up to 12fps mechanical / 15fps electronic shutter'],
    ['Video', 'Full HD up to 120fps'],
    ['Display', '3.0" vari-angle touchscreen'],
    ['Sensor', '24.2 Megapixel APS-C CMOS sensor'],
    ['Processor', 'DIGIC X image processor'],
    ['Autofocus', 'Dual Pixel CMOS AF II']
  ]

  return (
    <section id="specs" className="relative bg-ink-soft px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Specifications</p>
          <h2 className="font-display text-4xl font-light tracking-tight text-paper md:text-6xl">Built around the essentials.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.label} className="rounded border border-ink-line bg-ink p-5 transition duration-300 hover:border-canon-red/70 hover:shadow-[0_0_0_1px_rgba(224,32,43,0.2)]">
              <p className="text-[10px] uppercase tracking-[0.22em] text-paper-mute">{spec.label}</p>
              <p className="mt-4 text-lg leading-7 text-paper">{spec.value}</p>
            </div>
          ))}
        </div>

        <details className="mt-8 rounded border border-ink-line bg-ink">
          <summary className="cursor-pointer list-none px-5 py-4 text-left text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:text-canon-red">
            View full specifications
          </summary>
          <div className="border-t border-ink-line px-5 py-5">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {fullSpecs.map(([label, value]) => (
                <div key={label} className="rounded border border-ink-line bg-ink-soft p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-paper-mute">{label}</p>
                  <p className="mt-2 text-base leading-6 text-paper">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <OverviewSection />
        <CameraViews />
        <FeatureStory />
        <Features />
        <Suspense fallback={<SectionFallback />}>
          <CinematicTeaser />
          <LensGallery />
          <ExplodedView />
        </Suspense>
        <StoryGallery />
        <SpecsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
