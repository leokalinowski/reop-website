import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

const Benefits = () => {
  const benefits = [
    {
      title: "Seamless Operations",
      description: "Experience streamlined operations that run automatically, freeing you to focus on building meaningful client relationships and growing your business.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Client Engagement",
      description: "Keep clients consistently engaged through professionally managed newsletters, social media, and personalized surprise initiatives that drive referrals.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Organic Growth",
      description: "Watch your business grow naturally through proven systems that generate repeat clients and referrals without cold calling or aggressive tactics.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "No Cost Structure",
      description: "Join our team with zero monthly fees or financial burden – receive full support, proven systems, and comprehensive resources at no cost to you.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
            Transform Your Business
          </h2>
          <p className="text-muted-foreground text-lg">
            Imagine a real estate career where operations run seamlessly, clients stay engaged, and growth happens organically. Our comprehensive platform transforms your business by providing the tools, support, and strategies to elevate efficiency, enhance client satisfaction, and achieve unprecedented success – all at no cost to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <GlowingEffect
              key={index}
              className="text-center space-y-4 p-6 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50 group"
              blur={8}
              spread={100}
              borderWidth={2}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </GlowingEffect>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;