import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Calendar, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const divisions = [
  {
    title: "Database & Client Relations",
    description: "Organize, segment, and stay in touch with your sphere effortlessly.",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Event Management",
    description: "Plan, execute, and track client appreciation events that strengthen relationships.",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    title: "Surprise & Delight",
    description: "Thoughtful touchpoints that keep you top-of-mind without the stress.",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "Operations & Growth",
    description: "Weekly coaching, accountability, and systems that scale with you.",
    icon: TrendingUp,
    color: "text-purple-500",
  },
];

const AgentOpsHQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="agent-ops-hq" ref={ref} className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-grid opacity-5"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            REOP (Real Estate on Purpose™) gives you everything you need to grow a referral-based business that actually feels good to run.
          </p>
          <p className="text-base text-foreground max-w-3xl mx-auto">
            We've built, tested, and refined the systems top agents use to stay consistent — and now, we bring them to you through our signature <span className="font-semibold text-primary">Agent Ops HQ™</span> framework.
          </p>
        </motion.div>

        {/* 4-Division Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {divisions.map((division, index) => {
            const Icon = division.icon;
            return (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-card border-2 border-transparent hover:border-primary/20 rounded-2xl p-8 h-full min-h-[360px] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className={`w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 ${division.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {division.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {division.description}
                  </p>
                </div>
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
            className="h-14 px-8 text-base font-semibold"
          >
            Explore the Agent Ops HQ Framework →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentOpsHQ;