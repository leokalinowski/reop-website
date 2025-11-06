import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Send, Target, TrendingUp, Gift } from 'lucide-react';

const divisions = [
  {
    icon: Send,
    title: "Outreach Division",
    description: "Keep your sphere connected through SphereSync™, e-newsletters, and done-for-you Client Events.",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Conversion Division",
    description: "Guide clients seamlessly from first contact to closing with Buyer & Seller Blueprints and automated nurturing.",
    color: "text-accent"
  },
  {
    icon: TrendingUp,
    title: "Performance Division",
    description: "Track your real results — conversations → closings — through the Agent Success Scoreboard™ and weekly coaching.",
    color: "text-secondary"
  },
  {
    icon: Gift,
    title: "Delight Loop Division",
    description: "Keep past clients engaged with thoughtful gifts, post-closing touches, and value drops that generate referrals.",
    color: "text-primary"
  }
];

const AgentOpsHQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="agent-ops-hq" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-grid opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground">
            We've Built the Systems.{' '}
            <span className="text-primary">You Choose How to Use Them.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            REOP (Real Estate on Purpose™) gives you everything you need to grow a referral-based business that actually feels good to run.
          </p>
          <p className="text-base text-foreground max-w-3xl mx-auto">
            We've built, tested, and refined the systems top agents use to stay consistent — and now, we bring them to you through our signature <span className="font-semibold text-primary">Agent Ops HQ™</span> framework.
          </p>
        </motion.div>

        {/* 4-Quadrant Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {divisions.map((division, index) => {
            const Icon = division.icon;
            return (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BackgroundGradient className="rounded-2xl p-1 h-full">
                  <div className="bg-card rounded-2xl p-8 h-full hover:scale-[1.02] transition-transform duration-300">
                    <div className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 ${division.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {division.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {division.description}
                    </p>
                  </div>
                </BackgroundGradient>
              </motion.div>
            );
          })}
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
            Explore the Agent Ops HQ Framework →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentOpsHQ;