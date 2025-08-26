
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ValueProposition from '@/components/ValueProposition';
import Features from '@/components/Features';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ValueProposition />
        <Features />
        <Benefits />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
