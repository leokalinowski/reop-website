import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const features = [
  "Done-for-you SphereSync™ database management",
  "Quarterly client appreciation events (fully executed)",
  "Weekly group coaching & accountability calls",
  "Monthly surprise & delight campaigns",
  "Automated newsletter & social media content",
  "Transaction coordination support",
  "Access to all REOP tools & templates"
];

const SupportedAgentModel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-grid opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            The Plug and Play Business for{' '}
            <span className="text-primary">Successful Agents</span>
          </h2>
        </motion.div>

        {/* Supported Agent Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="cosmic-glass rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-xl shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Supported Agent
                </h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Your investment
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">You want…</p>
                  <p className="text-base text-foreground">
                    To have REOP's team set up and manage your systems so you can focus on clients.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Ideal for…</p>
                  <p className="text-base text-foreground">
                    Agents ready to delegate operations and focus on growth.
                  </p>
                </div>
              </div>

              {/* Investment Highlight */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 mt-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Your Investment</p>
                <p className="text-3xl font-bold text-accent">25%</p>
                <p className="text-sm text-muted-foreground">referral fee on closings</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-4">You get…</p>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-base text-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-6">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto h-14 text-base font-semibold"
                >
                  Explore Supported Agent Model →
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportedAgentModel;