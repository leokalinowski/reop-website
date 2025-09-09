import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LeadCaptureForm from './LeadCaptureForm';

const CTASection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-primary/5 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 cosmic-grid opacity-10"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full">
        <div className="w-full h-full opacity-10 bg-primary blur-[120px]"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-foreground">
            Discover Your Real Estate Success Potential
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your free personalized analysis showing exactly how much more you could earn by joining our team.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => setIsFormOpen(true)}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/80 text-lg h-14 px-12 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get My Free Success Analysis
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          No monthly fees • Full support • Proven systems • See your potential in minutes
        </p>
      </div>

      <LeadCaptureForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
};

export default CTASection;