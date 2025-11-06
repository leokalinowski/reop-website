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
    <section ref={ref} className="section-padding section-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-glow opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 space-y-4 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Real Agents. <span className="text-primary">Real Results.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto opacity-80">
            From overwhelmed and overworked to organized and in control — REOP agents are rediscovering why they fell in love with real estate in the first place.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
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
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-5 h-5 sm:w-7 sm:h-7 text-primary ml-0.5 sm:ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Quote Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-xs sm:text-sm md:text-base font-medium italic">
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
          className="text-center px-4"
        >
          <Button 
            size="lg"
            variant="outline"
            className="text-sm sm:text-base md:text-lg h-12 sm:h-14 px-6 sm:px-8 md:px-12 w-full sm:w-auto"
          >
            🎥 Watch Their Stories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;