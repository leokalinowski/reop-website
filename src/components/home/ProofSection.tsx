import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const testimonials = [
  {
    quote: "I finally stopped spinning my wheels.",
    name: "Agent Success Story 1"
  },
  {
    quote: "The systems did what I never had time to build.",
    name: "Agent Success Story 2"
  },
  {
    quote: "For the first time in years, I took a real vacation.",
    name: "Agent Success Story 3"
  }
];

const ProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-grid opacity-5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            Real Agents. <span className="text-primary">Real Results.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From overwhelmed and overworked to organized and in control — REOP agents are rediscovering why they fell in love with real estate in the first place.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative">
                <div 
                  className="video-placeholder rounded-2xl shadow-xl overflow-hidden"
                  data-video-slot={`testimonial-${index + 1}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Quote Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-sm md:text-base text-foreground font-medium italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button 
            size="lg"
            variant="outline"
            className="text-lg h-14 px-8"
          >
            🎥 Watch Their Stories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;