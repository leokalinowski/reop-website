import React, { useState, useEffect, useRef } from 'react';
import { Users, Target, BarChart, Gift } from 'lucide-react';

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const divisions = [
    {
      title: "Outreach Division",
      description: "Keep your sphere connected through SphereSync™, e-newsletters, and done-for-you Client Events.",
      icon: Users
    },
    {
      title: "Conversion Division", 
      description: "Guide clients seamlessly from first contact to closing with Buyer & Seller Blueprints and automated nurturing.",
      icon: Target
    },
    {
      title: "Performance Division",
      description: "Track your real results — conversations → closings — through the Agent Success Scoreboard™ and weekly coaching.",
      icon: BarChart
    },
    {
      title: "Delight Loop Division",
      description: "Keep past clients engaged with thoughtful gifts, post-closing touches, and value drops that generate referrals.",
      icon: Gift
    }
  ];

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 bg-secondary/20 relative overflow-hidden">
      {/* Dark ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-secondary/10 to-primary/20" />
      
      <div className={`max-w-7xl mx-auto space-y-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header Section with Visual Element */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground leading-tight">
              We've Built the Systems. You Choose How to Use Them.
            </h2>
            <div className="space-y-3">
              <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                REOP (Real Estate on Purpose™) gives you everything you need to grow a referral-based business that actually feels good to run.
              </p>
              <p className="text-white/95 text-lg md:text-xl leading-relaxed">
                We've built, tested, and refined the systems top agents use to stay consistent—and now, we bring them to you through our signature Agent Ops HQ™ framework.
              </p>
            </div>
          </div>
          
          {/* Visual Framework Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 p-8">
              {divisions.map((division, index) => {
                const IconComponent = division.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      0{index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Division Cards - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {divisions.map((division, index) => {
            const IconComponent = division.icon;
            const delays = ['delay-[0ms]', 'delay-[100ms]', 'delay-[200ms]', 'delay-[300ms]'];
            return (
              <div key={index} className={`bg-white rounded-2xl border-2 border-primary p-5 md:p-6 shadow-lg hover:scale-[1.02] transition-transform duration-300 group ${delays[index]}`}>
                <div className="flex gap-4 items-start">
                  {/* Number Badge + Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                      <IconComponent className="h-7 w-7 text-primary relative z-10" />
                      <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                      0{index + 1}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                      {division.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {division.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Bottom Callout */}
        <div className="text-center space-y-4 pt-4">
          <p className="text-white/90 text-sm md:text-base font-medium">
            Four divisions. One complete system. Zero overwhelm.
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;