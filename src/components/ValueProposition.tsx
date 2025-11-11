import React, { useState, useEffect, useRef } from 'react';
import { BackgroundGradient } from '@/components/ui/background-gradient';
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
      
      <div className={`max-w-7xl mx-auto space-y-12 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground">
            We've Built the Systems. You Choose How to Use Them.
          </h2>
          <div className="space-y-4">
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              REOP (Real Estate on Purpose™) gives you everything you need to grow a referral-based business that actually feels good to run.
            </p>
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
              We've built, tested, and refined the systems top agents use to stay consistent—and now, we bring them to you through our signature Agent Ops HQ™ framework.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {divisions.map((division, index) => {
            const IconComponent = division.icon;
            return (
              <BackgroundGradient
                key={index}
                className="rounded-[22px] w-full"
                containerClassName="group"
              >
                <div className="bg-background/95 rounded-3xl p-6 md:p-8 space-y-6 min-h-[360px] flex flex-col hover:scale-[1.02] transition-transform duration-300 border border-white/10">
                  <div className="flex items-center justify-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4 flex-1 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
                      {division.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {division.description}
                    </p>
                  </div>
                  
                  {/* Subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </BackgroundGradient>
            );
          })}
        </div>
        
        {/* Bottom accent */}
        <div className="flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;