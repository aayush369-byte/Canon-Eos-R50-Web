import React, { lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CameraViews from './components/CameraViews.jsx'
import RotationSection from './components/RotationSection.jsx'
import Features from './components/Features.jsx'
import FeatureStory from './components/FeatureStory.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

const LensGallery = lazy(() => import('./components/LensGallery.jsx'))
const ExplodedView = lazy(() => import('./components/ExplodedView.jsx'))
const UnboxingSection = lazy(() => import('./components/UnboxingSection.jsx'))
const CinematicTeaser = lazy(() => import('./components/CinematicTeaser.jsx'))

function SectionFallback() {
  return <div className="min-h-40 bg-ink flex items-center justify-center text-paper-mute text-xs tracking-[0.2em] uppercase" aria-label="Loading section">Loading</div>
}

export default function App() {
  return (
    <div className="relative bg-ink min-h-screen">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <CameraViews />
        <RotationSection />
        <Features />
        <FeatureStory />
        <Suspense fallback={<SectionFallback />}>
          <CinematicTeaser />
          <LensGallery />
          <ExplodedView />
          <UnboxingSection />
        </Suspense>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
