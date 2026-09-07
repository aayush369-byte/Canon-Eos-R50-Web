import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CameraViews from './components/CameraViews.jsx'
import Features from './components/Features.jsx'
import FeatureStory from './components/FeatureStory.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import { featureStats } from './data/features.js'

const LensGallery = lazy(() => import('./components/LensGallery.jsx'))
const ExplodedView = lazy(() => import('./components/ExplodedView.jsx'))
const UnboxingSection = lazy(() => import('./components/UnboxingSection.jsx'))
const CinematicTeaser = lazy(() => import('./components/CinematicTeaser.jsx'))

function SectionFallback() {
  return <div className="min-h-40 bg-ink flex items-center justify-center text-paper-mute text-xs tracking-[0.2em] uppercase" aria-label="Loading section">Loading</div>
}

function OverviewSection() {
  return (
    <section id="overview" className="relative bg-ink-soft border-t border-b border-ink-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="mb-4 text-[11px] tracking-[0.24em] text-canon-red uppercase">Overview</p>
          <h2 className="max-w-xl font-display text-4xl font-light tracking-tight text-paper md:text-6xl">
            A capable camera for the way you create.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-paper-dim md:text-lg">
            The EOS R50 combines a 24.2 Megapixel APS-C sensor, DIGIC X processing, and dual pixel autofocus into a compact body built for movement, creativity, and everyday storytelling.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {featureStats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="rounded border border-ink-line bg-ink px-4 py-5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
              <p className="font-display text-3xl text-paper">{stat.value}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-paper-mute">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
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
          <p className="mb-4 text-[11px] tracking-[0.24em] text-canon-red uppercase">Editorial gallery</p>
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
    { label: 'AF System', value: 'Dual Pixel CMOS AF II (up to 651 AF zones)' },
    { label: 'Video', value: '4K video, oversampled from 6K, uncropped, up to 30fps' },
    { label: 'Display', value: '3.0" fully articulated vari-angle touchscreen' },
    { label: 'Mount', value: 'RF lens mount, supports RF and RF-S lenses' }
  ]

  const fullSpecs = [
    ['Continuous shooting', 'Up to 12fps mechanical / 15fps electronic shutter'],
    ['Video', 'Full HD up to 120fps'],
    ['Display', '3.0" fully articulated vari-angle touchscreen'],
    ['Sensor', '24.2 Megapixel APS-C CMOS sensor'],
    ['Processor', 'DIGIC X image processor'],
    ['Autofocus', 'Dual Pixel CMOS AF II']
  ]

  return (
    <section id="specs" className="relative bg-ink-soft px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-[11px] tracking-[0.24em] text-canon-red uppercase">Specifications</p>
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
  return (
    <div className="relative bg-ink min-h-screen">
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
          <UnboxingSection />
        </Suspense>
        <StoryGallery />
        <SpecsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
