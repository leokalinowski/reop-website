import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
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
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="pt-24">
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