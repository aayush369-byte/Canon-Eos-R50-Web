import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import CameraViews from './components/CameraViews.jsx'
import RotationSection from './components/RotationSection.jsx'
import Features from './components/Features.jsx'
import FeatureStory from './components/FeatureStory.jsx'
import LensGallery from './components/LensGallery.jsx'
import ExplodedView from './components/ExplodedView.jsx'
import UnboxingSection from './components/UnboxingSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative bg-ink min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CameraViews />
        <RotationSection />
        <Features />
        <FeatureStory />
        <LensGallery />
        <ExplodedView />
        <UnboxingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
