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
      <section ref={ref} className="section-padding bg-muted/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 cosmic-grid opacity-5"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column - Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="relative">
                <div 
                  className="image-placeholder rounded-2xl shadow-2xl"
                  data-image-slot="pam-portrait"
                  style={{ aspectRatio: '3/4' }}
                />
                
                {/* Handwritten Signature Overlay */}
                <div className="absolute -bottom-6 -right-6 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <p className="font-handwritten text-2xl md:text-3xl text-primary">
                    — Pam O'Bryant
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Founder, REOP</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2 space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
                Hey, I'm Pam — and I Built REOP{' '}
                <span className="text-primary">for Agents Like You.</span>
              </h2>
              
              <div className="space-y-4 text-base md:text-lg text-foreground leading-relaxed">
                <p>
                  After nearly three decades in real estate — from building teams to teaching across the country — I saw too many talented agents burning out.
                </p>
                <p>
                  They didn't need more motivation. They needed clarity, accountability, and a little help implementing what they already knew worked.
                </p>
                <p>
                  That's why I built REOP: a modern, human-centered platform where agents can focus on what they do best — <span className="font-semibold text-primary">building relationships</span> — while we handle the rest.
                </p>
                <p className="font-medium">
                  Ready to get your time, energy, and joy back? I'd love to talk.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button 
                  onClick={() => setIsFormOpen(true)}
                  size="lg"
                  className="text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
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