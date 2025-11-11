import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const Hero = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background gradient instead of video for now */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100" />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content Stack */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Animated Text Flow */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-white text-base md:text-xl mb-6 animate-fade-in">
            <span className="font-medium">Relationships</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="font-medium">Systems</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="font-medium">Results</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight">
            Build a Business that Loves You Back
          </h1>
          
          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            Everything you need to build a thriving, referral-based business — whether you want to do it yourself or have us do it for you.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-base font-semibold w-full sm:w-auto"
            >
              🎁 Get the Free Agent Systems Starter Pack
            </Button>
            <a 
              href="#how-it-works" 
              className="text-white underline underline-offset-4 hover:text-white/80 transition-colors text-base font-medium"
            >
              → See How REOP Works
            </a>
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

export default Hero;
