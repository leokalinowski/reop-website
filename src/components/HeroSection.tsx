import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskBoard from './TaskBoard';
import { Loader } from 'lucide-react';
import Logo from './Logo';
import LightRays from './LightRays';
import LeadCaptureForm from './LeadCaptureForm';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <section className="relative w-full py-12 md:py-20 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Light Rays Background Effect - Hidden on mobile for performance */}
      <div className="absolute inset-0 z-[1] hidden md:block">
        <LightRays
          raysColor="#005d6c"
          raysOrigin="top-center"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          mouseInfluence={0}
          noiseAmount={0.13}
          distortion={0}
          pulsating={true}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      
      {/* Mobile background with restored visual effects */}
      <div className="absolute inset-0 z-[1] md:hidden">
        <div className="cosmic-gradient h-full w-full"></div>
        <div className="absolute inset-0 cosmic-grid opacity-20"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]"></div>
      </div>
      
      {/* Logo positioned at top */}
      <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20">
        <Logo />
      </div>
      
      {/* Cosmic particle effect (background dots) - Visible on desktop */}
      <div className="absolute inset-0 cosmic-grid opacity-30 z-[2] hidden md:block"></div>
      
      {/* Gradient glow effect - Reduced on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full z-[2]">
        <div className="w-full h-full opacity-5 md:opacity-10 bg-primary blur-[60px] md:blur-[120px]"></div>
      </div>
      
      <div className={`relative z-10 max-w-4xl text-center space-y-6 pt-24 md:pt-32 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-muted text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            Transform your real estate career
            <Loader className="h-3 w-3 animate-spin text-primary" />
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-balance text-foreground">
          Build a Business that{' '}
          <span className="text-primary font-medium">Loves You Back!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Everything you need to build a thriving, referral-based business — <span className="italic">whether you want to do it yourself or have us do it for you</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 items-center">
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground text-base h-12 px-8 transition-all duration-200 min-h-[48px]"
          >
            Get Your Free Success Analysis
          </Button>
        </div>
        
        <div className="pt-6 text-sm text-muted-foreground">
          No monthly fees • Full support • Proven systems
        </div>
      </div>
      
      {/* Task Manager UI integrated in hero section with glassmorphic effect */}
      <div className={`w-full max-w-7xl mt-12 z-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="cosmic-glow relative rounded-xl overflow-hidden border border-border backdrop-blur-sm bg-card shadow-lg">
          {/* Dashboard Header */}
          <div className="bg-card backdrop-blur-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                  <div className="h-3 w-3 rounded-sm bg-foreground"></div>
                </div>
                <span className="text-foreground font-medium">SphereSync Dashboard</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-muted border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/80 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/60 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/40 border-2 border-card flex items-center justify-center text-xs text-foreground">+3</div>
                </div>
                
                <div className="h-8 px-3 rounded-md bg-muted flex items-center justify-center text-foreground text-sm">
                  Share
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="flex flex-col md:flex-row h-auto md:h-[600px] overflow-hidden">
              {/* Sidebar - Responsive layout */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border p-4 space-y-4 bg-card">
                {/* Mobile: Horizontal navigation */}
                <div className="block md:hidden">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-foreground"></div>
                      <span>Agent Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>SphereSync</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Database</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Events</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>E-Newsletter</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Social Media</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Success Scoreboard</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50 whitespace-nowrap">
                      <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                      <span>Transaction Coordination</span>
                    </div>
                  </div>
                </div>

                {/* Desktop: Vertical navigation */}
                <div className="hidden md:block space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground uppercase">Navigation</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted text-foreground">
                        <div className="h-3 w-3 rounded-sm bg-foreground"></div>
                        <span>Agent Dashboard</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>SphereSync</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>Database</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>Events</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>E-Newsletter</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>Social Media</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>Success Scoreboard</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted/50">
                        <div className="h-3 w-3 rounded-sm bg-muted-foreground/30"></div>
                        <span>Transaction Coordination</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-4 bg-background overflow-hidden min-h-[400px] md:min-h-0">
                {/* Board Header */}
                <div className="flex items-center justify-between mb-6 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <h3 className="font-medium text-foreground">Deals</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">23</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 9L17 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 17L7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="h-8 px-3 rounded-md bg-foreground text-background flex items-center justify-center text-sm font-medium whitespace-nowrap">
                      New Opportunity
                    </div>
                  </div>
                </div>
                
                {/* Kanban Board */}
                <div className="overflow-hidden">
                  <TaskBoard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <LeadCaptureForm 
      isOpen={isFormOpen}
      onClose={() => setIsFormOpen(false)}
    />
    </>
  );
};

export default HeroSection;