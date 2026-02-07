import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import ProductShowcase from './sections/ProductShowcase';
import Features from './sections/Features';
import Gallery from './sections/Gallery';
import Specifications from './sections/Specifications';
import CallToAction from './sections/CallToAction';
import Footer from './sections/Footer';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Configure GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    });

    // Set default ease
    gsap.defaults({
      ease: 'power3.out',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Product Showcase - Bento Grid */}
        <ProductShowcase />

        {/* Features Deep Dive */}
        <Features />

        {/* Gallery */}
        <Gallery />

        {/* Technical Specifications */}
        <Specifications />

        {/* Call to Action */}
        <CallToAction />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
