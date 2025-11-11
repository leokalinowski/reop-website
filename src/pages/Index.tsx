import React, { lazy } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import ValueProposition from '@/components/ValueProposition';
import LazySection from '@/components/LazySection';
import Footer from '@/components/Footer';

// Lazy load components that are below the fold
const AutomatedOutreach = lazy(() => import('@/components/AutomatedOutreach'));
const LeadManagement = lazy(() => import('@/components/LeadManagement'));
const EventManagement = lazy(() => import('@/components/EventManagement'));
const NewsletterTools = lazy(() => import('@/components/NewsletterTools'));
const SocialMediaTools = lazy(() => import('@/components/SocialMediaTools'));
const WeeklyCoaching = lazy(() => import('@/components/WeeklyCoaching'));
const TransactionCoordination = lazy(() => import('@/components/TransactionCoordination'));
const SurpriseDelight = lazy(() => import('@/components/SurpriseDelight'));
const Benefits = lazy(() => import('@/components/Benefits'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const CEOSection = lazy(() => import('@/components/CEOSection'));
const CTASection = lazy(() => import('@/components/CTASection'));

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <ValueProposition />
        
        <LazySection>
          <AutomatedOutreach />
        </LazySection>
        
        <LazySection>
          <LeadManagement />
        </LazySection>
        
        <LazySection>
          <EventManagement />
        </LazySection>
        
        <LazySection>
          <NewsletterTools />
        </LazySection>
        
        <LazySection>
          <SocialMediaTools />
        </LazySection>
        
        <LazySection>
          <WeeklyCoaching />
        </LazySection>
        
        <LazySection>
          <TransactionCoordination />
        </LazySection>
        
        <LazySection>
          <SurpriseDelight />
        </LazySection>
        
        <LazySection>
          <Benefits />
        </LazySection>
        
        <LazySection>
          <Testimonials />
        </LazySection>
        
        <LazySection>
          <CEOSection />
        </LazySection>
        
        <LazySection>
          <CTASection />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;