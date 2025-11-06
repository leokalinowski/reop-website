import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const resources = [
  {
    title: "The Database Health Scorecard",
    description: "Uncover hidden opportunities in your sphere"
  },
  {
    title: "A 30-Day SphereSync™ Plan",
    description: "Create immediate momentum with your contacts"
  },
  {
    title: "Full Client Event Playbook",
    description: "Reconnect with your people through events"
  }
];

const FreeResourceSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section ref={ref} className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
              Get the Systems That <span className="text-primary">Simplify Your Business</span> — Free.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Inside the <span className="font-semibold text-foreground">Agent Systems Starter Pack</span>, you'll find three of our most popular tools:
            </p>
          </motion.div>

          {/* Resources List */}
          <div className="space-y-6 mb-12">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <p className="text-base text-foreground max-w-2xl mx-auto">
              Whether you're DIY'ing your systems or ready to hand them off, this is where clarity begins.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <Button 
              onClick={() => setIsFormOpen(true)}
              size="lg"
              className="text-lg h-16 px-12 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              🎁 Get My Free Starter Pack
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Includes weekly "Agent Love Letters" — short, actionable ideas to help you stay in momentum and in love with your business.
            </p>
          </motion.div>
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