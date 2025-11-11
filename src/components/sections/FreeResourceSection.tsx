import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const FreeResourceSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const benefits = [
    "The Database Health Scorecard to uncover hidden opportunities.",
    "A 30-Day SphereSync™ Plan to create immediate momentum.",
    "A Full Client Event Playbook to reconnect with your people."
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground leading-tight">
            Get the Systems That Simplify Your Business — Free.
          </h2>
          
          <p className="text-lg max-w-3xl mx-auto mb-8 text-foreground leading-relaxed">
            Inside the Agent Systems Starter Pack, you'll find three of our most popular tools:
          </p>
          
          {/* 3-Bullet List */}
          <ul className="max-w-2xl mx-auto text-left space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-lg text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-lg max-w-3xl mx-auto mb-8 text-foreground leading-relaxed">
            Whether you're DIY'ing your systems or ready to hand them off, this is where clarity begins.
          </p>
          
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-base font-semibold mb-4"
          >
            🎁 Get My Free Starter Pack
          </Button>
          
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            Includes weekly "Agent Love Letters" — short, actionable ideas to help you stay in momentum and in love with your business.
          </p>
        </div>
      </section>

      <LeadCaptureForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
};

export default FreeResourceSection;
