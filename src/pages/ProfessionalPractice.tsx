import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, RefreshCw, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import FooterMinimal from '@/components/FooterMinimal';
import LightRays from '@/components/LightRays';
import SEO from '@/components/SEO';
import { useIsMobile } from '@/hooks/use-mobile';

/* ─── Scroll-triggered visibility hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Pathway data ─── */
const pillars = [
  {
    icon: Building2,
    label: 'The Foundation',
    title: 'Agent Ops HQ™',
    body: 'Acts as your transaction backbone, handling 100% of the administrative logistics and compliance.',
  },
  {
    icon: RefreshCw,
    label: 'The Workflow',
    title: 'SphereSync™',
    body: 'Manages your client experience and organic outreach, replacing the need for "hustle culture" and cold sales tactics.',
  },
  {
    icon: TrendingUp,
    label: 'The Talent Pathway',
    title: 'Tiered Growth',
    body: 'A tiered structure where your responsibility and income increase as you move from execution to strategy—without the model breaking you.',
  },
  {
    icon: Target,
    label: 'The Focus',
    title: 'Your Highest Value',
    body: 'You return to what matters most: high-level strategy, complex negotiation, and building trust.',
  },
];

const ProfessionalPractice = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile();
  const trap = useInView(0.2);
  const pathway = useInView(0.1);
  const vision = useInView(0.2);
  const cta = useInView(0.2);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SEO
        title="The Professional Practice | Real Estate on Purpose"
        description="Transition from solo operator to professional practice founder with a true operating platform for high-performing real estate agents."
        keywords={["real estate practice", "professional practice", "agent ops", "real estate operating model"]}
        url="https://reop-website.lovable.app/professional-practice"
      />

      

      <main className="overflow-hidden">
        {/* ════════════════════  HERO  ════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-12">
          {/* Background effects */}
          {!isMobile && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <LightRays />
            </div>
          )}
          <div className="absolute inset-0 cosmic-gradient opacity-40 pointer-events-none" />

          <div
            className={`relative z-10 max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ease-out ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-sm uppercase tracking-widest text-primary font-medium">
              A New Operating Model for Real Estate
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-foreground">
              The{' '}
              <span className="text-primary">Professional Practice</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              You've reached a point where your talent is outpacing your time.
            </p>

            {/* scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-8"
            >
              <span className="block w-5 h-8 mx-auto rounded-full border-2 border-muted-foreground/30 relative">
                <span className="block w-1.5 h-1.5 rounded-full bg-primary absolute top-1.5 left-1/2 -translate-x-1/2" />
              </span>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════  MANAGEMENT TRAP  ════════════════════ */}
        <section
          ref={trap.ref}
          className="relative py-24 md:py-32 px-6 md:px-12 bg-primary/5"
        >
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />

          <div
            className={`relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 ${
              trap.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Copy */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
                The Reality of the{' '}
                <span className="text-primary">"Management Trap"</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Most high-performing agents eventually hit a structural bottleneck. You have the skill to produce at a much higher level, but you are personally managing the <em>"Whirlwind"</em> of admin, logistics, and daily friction. You aren't just an agent anymore; you've become the primary bottleneck of your own business.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In the traditional team model, every problem, piece of paperwork, and administrative fire flows upward to the leader. This creates{' '}
                <span className="font-semibold text-primary">"Peak Friction"</span>—the point where you are too busy managing a team to actually grow a practice.
              </p>
              <p className="italic text-foreground/80 text-lg border-l-2 border-primary pl-4">
                We believe real estate is evolving from a sales job into a professional practice. It is time for the industry to grow up.
              </p>
            </div>

            {/* Peak Friction visual */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm space-y-6">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-center">
                  Your Friction Level
                </p>
                {[
                  { label: 'Admin & Paperwork', pct: 85, delay: 0 },
                  { label: 'Team Management', pct: 72, delay: 0.15 },
                  { label: 'Client Logistics', pct: 90, delay: 0.3 },
                  { label: 'Strategic Growth', pct: 15, delay: 0.45 },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">{bar.label}</span>
                      <span className="text-primary font-medium">{bar.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={trap.visible ? { width: `${bar.pct}%` } : {}}
                        transition={{ duration: 1, delay: bar.delay, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-4 text-center">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-semibold tracking-wide">
                    Peak Friction Zone
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════  THE PATHWAY  ════════════════════ */}
        <section
          ref={pathway.ref}
          className="relative py-24 md:py-32 px-6 md:px-12"
        >
          <div className="max-w-4xl mx-auto space-y-16">
            <div
              className={`text-center space-y-4 transition-all duration-700 ${
                pathway.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                The Pathway to a{' '}
                <span className="text-primary">Transferable Business</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We provide a clear progression from a solo operator to a professional practice founder, built on a true operating platform.
              </p>
            </div>

            {/* Timeline cards */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px hidden sm:block" />

              <div className="space-y-12 md:space-y-16">
                {pillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  const isEven = i % 2 === 0;
                  return (
                    <motion.div
                      key={pillar.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={pathway.visible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.2, ease: 'easeOut' }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Dot on timeline */}
                      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 hidden sm:block" />

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block md:w-1/2" />

                      {/* Card */}
                      <Card className="md:w-1/2 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 sm:ml-14 md:ml-0">
                        <CardContent className="p-6 space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wider text-primary font-medium">
                                {pillar.label}
                              </p>
                              <h3 className="text-lg font-semibold text-foreground">
                                {pillar.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {pillar.body}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════  THE VISION  ════════════════════ */}
        <section
          ref={vision.ref}
          className="relative py-24 md:py-36 px-6 md:px-12 bg-primary/5"
        >
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />

          <div
            className={`relative z-10 max-w-3xl mx-auto text-center space-y-8 transition-all duration-700 ${
              vision.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground italic leading-tight">
              Just imagine a practice that outlasts your personal energy.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              I'm not sure if it's for you, but we are looking for high-performers who are ready to move from functional burnout to practice leadership.
            </p>
          </div>
        </section>

        {/* ════════════════════  CTA  ════════════════════ */}
        <section
          ref={cta.ref}
          className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none">
            <div className="w-full h-full opacity-10 bg-primary blur-[120px]" />
          </div>

          <div
            className={`relative z-10 max-w-2xl mx-auto text-center space-y-8 transition-all duration-700 ${
              cta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              Schedule a{' '}
              <span className="text-primary">Strategic Diagnostic</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              A 15-minute conversation to identify your current "Peak Friction" and see if a platform model fits your goals.
            </p>

            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a
                  href="https://lp.realestateonpurpose.com/appointmentwithreop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Strategic Diagnostic
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterMinimal />
    </>
  );
};

export default ProfessionalPractice;
