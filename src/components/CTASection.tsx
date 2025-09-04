import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Supabase for sign-up
    console.log('Email submitted:', email);
    setEmail('');
  };

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
            Join the Real Estate On Purpose Team Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on this game-changing opportunity – join our team today at no cost and propel your real estate career to new heights.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-12 text-base"
          />
          <Button 
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/80 text-base h-12 px-8 whitespace-nowrap"
          >
            Apply to Join Our Team
          </Button>
        </form>
        
        <p className="text-sm text-muted-foreground">
          No monthly fees • Full support • Proven systems • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;