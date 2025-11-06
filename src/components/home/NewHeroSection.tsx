import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import SEO from '@/components/SEO';

const NewHeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scrollToAgentOps = () => {
    const agentOpsSection = document.getElementById('agent-ops-hq');
    if (agentOpsSection) {
      agentOpsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title="REOP - Real Estate on Purpose® | Your Command Center"
        description="Build a thriving, referral-based real estate business with systems, support, and clarity. Everything you need to grow with joy."
        keywords={["real estate systems", "agent operations", "sphere sync", "real estate coaching", "referral business"]}
      />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Background Elements */}
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]"></div>
        
        {/* Branding Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="px-6 py-2 rounded-full bg-card/50 backdrop-blur-md border border-primary/20">
            <p className="text-sm font-medium text-foreground">🌐 REOP — Real Estate on Purpose®</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-tight">
                  Build a Business that{' '}
                  <span className="text-primary">Loves You Back</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Everything you need to build a thriving, referral-based business — whether you want to do it yourself or have us do it for you.
                </p>
              </div>

              {/* Animated Flow Text */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex items-center gap-2 sm:gap-4 flex-wrap"
              >
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="overlay-text text-base sm:text-lg md:text-2xl"
                >
                  Relationships
                </motion.span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="overlay-text text-base sm:text-lg md:text-2xl"
                >
                  Systems
                </motion.span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="overlay-text text-base sm:text-lg md:text-2xl"
                >
                  Results
                </motion.span>
              </motion.div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  size="lg"
                  className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  🎁 Get the Free Agent Systems Starter Pack
                </Button>
                <Button 
                  onClick={scrollToAgentOps}
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold w-full sm:w-auto"
                >
                  See How REOP Works <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Video Placeholder */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div 
                className="video-placeholder rounded-2xl shadow-2xl"
                data-video-slot="hero-banner"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>

        <LeadCaptureForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </section>
    </>
  );
};

export default NewHeroSection;