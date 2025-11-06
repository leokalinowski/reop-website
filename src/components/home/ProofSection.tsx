import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const testimonials = [
  {
    quote: "REOP gave me my life back. I'm closing more deals and actually enjoying my business again.",
    name: "Sarah M., Austin, TX"
  },
  {
    quote: "The systems work. My referrals doubled in 6 months, and I have time for my family again.",
    name: "Mike R., Denver, CO"
  },
  {
    quote: "I went from scattered chaos to organized momentum. This is what I needed all along.",
    name: "Jennifer L., Charlotte, NC"
  }
];

const ProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding section-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 cosmic-grid opacity-20"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter" style={{ color: '#f8fafc' }}>
            Real Agents. <span className="text-primary">Real Results.</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#cbd5e1' }}>
            From overwhelmed and overworked to organized and in control — REOP agents are rediscovering why they fell in love with real estate in the first place.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                  style={{ aspectRatio: '16/9' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <p className="text-sm italic mt-4 text-center" style={{ color: '#e2e8f0' }}>
                  "{testimonial.quote}"
                </p>
                <p className="text-xs mt-2 text-center" style={{ color: '#cbd5e1' }}>
                  — {testimonial.name}
                </p>
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
            className="h-14 px-8 text-base font-semibold"
          >
            🎥 Watch Their Stories
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;