import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LightRays from '@/components/LightRays';
import ValueProposition from '@/components/ValueProposition';
import AutomatedOutreach from '@/components/AutomatedOutreach';
import LeadManagement from '@/components/LeadManagement';
import EventManagement from '@/components/EventManagement';
import NewsletterTools from '@/components/NewsletterTools';
import SocialMediaTools from '@/components/SocialMediaTools';
import WeeklyCoaching from '@/components/WeeklyCoaching';
import TransactionCoordination from '@/components/TransactionCoordination';
import SurpriseDelight from '@/components/SurpriseDelight';
import Benefits from '@/components/Benefits';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  const [logoPosition, setLogoPosition] = useState<{ x: number; y: number } | null>(null);

  const handleLogoPositionChange = useCallback((position: { x: number; y: number }) => {
    setLogoPosition(position);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative">
      {/* Full-screen Light Rays overlay */}
      {logoPosition && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          <LightRays
            raysOrigin="custom"
            customOrigin={logoPosition}
            raysColor="#005d6c"
            raysSpeed={1.5}
            lightSpread={1.2}
            rayLength={2.5}
            followMouse={true}
            mouseInfluence={0.05}
            noiseAmount={0.1}
            distortion={0.05}
            className="full-screen-rays"
          />
        </div>
      )}
      
      <Header onLogoPositionChange={handleLogoPositionChange} />
      <main className="pt-24 relative z-40">
        <HeroSection />
        <ValueProposition />
        <AutomatedOutreach />
        <LeadManagement />
        <EventManagement />
        <NewsletterTools />
        <SocialMediaTools />
        <WeeklyCoaching />
        <TransactionCoordination />
        <SurpriseDelight />
        <Benefits />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;