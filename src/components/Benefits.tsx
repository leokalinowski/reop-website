import React, { useState } from 'react';
import { Users, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadCaptureForm from './LeadCaptureForm';

const Benefits = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-slate-900 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-slate-50">
            The Plug and Play Business for Successful Agents
          </h2>
          <p className="text-slate-200 text-lg">
            One model. Full support. Built for agents who are ready to delegate and grow.
          </p>
        </div>
        
        {/* Single Premium Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-primary p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300 space-y-8">
            {/* Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                <Sparkles className="h-4 w-4" />
                Supported Agent Model
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* You want... */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">You want...</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    To have REOP's team set up and manage your systems so you can focus on clients.
                  </p>
                </div>

                {/* Ideal for... */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">Ideal for...</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Agents ready to delegate operations and focus on growth.
                  </p>
                </div>
              </div>

              {/* Right Column - You get... */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">You get...</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Done-for-you SphereSync™ with weekly contact lists",
                    "Fully executed Client Events from planning to follow-up",
                    "Complete transaction coordination with Surprise & Delight",
                    "Professional social media management (recording to posting)",
                    "Custom hyperlocal newsletters tailored to your sphere",
                    "Weekly coaching with Agent Success Scoreboard™ tracking"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Investment Section */}
            <div className="pt-6 border-t border-border">
              <div className="space-y-3 text-center">
                <h3 className="text-lg md:text-xl font-bold text-foreground">Your Investment</h3>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">25% referral fee on closings</p>
                  <p className="text-sm text-muted-foreground">
                    No monthly fees • No upfront costs • No software subscriptions
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-4 pt-4">
              <Button 
                onClick={() => setIsFormOpen(true)}
                size="lg"
                className="h-14 px-12 text-lg"
              >
                Schedule Your Strategy Session with Pam
              </Button>
              <p className="text-sm text-muted-foreground">
                See if you qualify • Get your personalized success analysis • Book your call with founder Pam O'Bryant
              </p>
            </div>
          </div>

          {/* Optional Trust Element */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Join 200+ supported agents growing their business with REOP
            </p>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Modal */}
      <LeadCaptureForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </section>
  );
};

export default Benefits;