
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "PO2 Tasks",
      description: "Automated weekly tasks based on DTD2 strategy. Pull from your database, check off completions, and see performance stats.",
      expandedDescription: "Generate automated weekly call and text lists from your database to ensure consistent lead nurturing. Track completion rates, view performance analytics, and never miss a follow-up opportunity again.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" stroke="currentColor" strokeWidth="2"/>
          <path d="M6 10l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Database Management",
      description: "Upload leads via CSV, edit inline, highlight DNC, and organize with categories for seamless integration with PO2.",
      expandedDescription: "Secure, organized database management with CSV upload capabilities, inline editing, DNC highlighting, and category organization. Keep your contacts compliant and accessible for automated outreach campaigns.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Pipeline Tracking",
      description: "Visualize deals from lead to close. Responsive cards with DNC status, values, and dates for quick tracking.",
      expandedDescription: "Drag-and-drop pipeline visualization from Lead to Closed. Track deal values, dates, client information, and DNC status with real-time metrics including win rates and average close times.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="7.5,4.21 12,6.81 16.5,4.21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="21,12 16.5,14.6 16.5,19.79" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="12,22.81 12,17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Events & Newsletters",
      description: "Schedule events, track attendance, send newsletters, and analyze engagement to nurture leads effectively.",
      expandedDescription: "Plan and manage events with attendance tracking, send targeted newsletters with open/click analytics, and boost engagement through strategic communication campaigns.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "Social Media Scheduler",
      description: "Schedule posts across platforms from CSV uploads. Track and compare reach, impressions, likes, comments, and engagement.",
      expandedDescription: "Multi-platform social media scheduling with CSV upload capabilities. Compare performance metrics across platforms including reach, impressions, likes, comments, and engagement rates.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Admin Dashboard",
      description: "Compare agents, aggregate metrics, and visualize business performance to guide your team to higher levels.",
      expandedDescription: "Comprehensive admin tools for team leaders to compare agent performance, aggregate business metrics, and visualize growth trends. Make data-driven decisions to improve team performance.",
      icon: (
        <LayoutDashboard size={24} className="text-primary" />
      )
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Powerful Tools for Every Strategy
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform integrates everything you need to deliver value and track success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-primary/40' : 'border-border'} bg-card/50 backdrop-blur-sm transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-border">
                  <p className="text-muted-foreground">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
