import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const PersonalInvitation = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <section ref={ref} className="section-padding section-dark relative overflow-hidden py-12 md:py-16 lg:py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Image (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div 
                  className="image-placeholder rounded-2xl shadow-2xl"
                  data-image-slot="pam-portrait"
                  style={{ aspectRatio: '3/4' }}
                />
                
                {/* Signature Overlay */}
                <div className="absolute -bottom-4 -right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <p className="font-handwritten text-2xl text-primary">
                    — Pam O'Bryant
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Founder, REOP</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 order-1 lg:order-2 space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter" style={{ color: '#f8fafc' }}>
                Hey, I'm Pam — and I Built REOP{' '}
                <span className="text-primary">for Agents Like You.</span>
              </h2>
              
              <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#e2e8f0' }}>
                <p>
                  After nearly three decades in real estate — from building teams to teaching across the country — I saw too many talented agents burning out.
                </p>
                <p>
                  They didn't need more motivation. They needed clarity, accountability, and a little help implementing what they already knew worked.
                </p>
                <p>
                  That's why I built REOP: a modern, human-centered platform where agents can focus on what they do best — <span className="font-semibold text-primary">building relationships</span> — while we handle the rest.
                </p>
                <p className="font-medium" style={{ color: '#f8fafc' }}>
                  Ready to get your time, energy, and joy back? I'd love to talk.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  size="lg"
                  className="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book a Discovery Call
                </Button>
              </div>
            </motion.div>
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

export default PersonalInvitation;