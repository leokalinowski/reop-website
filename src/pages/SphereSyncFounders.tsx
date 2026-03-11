import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Database, CalendarCheck, BarChart3, Users, MessageSquare, ShieldCheck,
  CheckCircle2, ArrowRight, Award, Clock, Zap, Target, TrendingUp, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackgroundGradient } from '@/components/ui/background-gradient';
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

const APPLY_URL = '#';

/* ─── Data ─── */
const founderReceives = [
  {
    icon: Database,
    title: 'Six Months of SphereSync',
    desc: 'Full access to the SphereSync platform while you implement the system.',
  },
  {
    icon: Users,
    title: 'Weekly Office Hours',
    desc: 'Live working sessions where we help you apply the system and solve real challenges inside your business.',
  },
  {
    icon: MessageSquare,
    title: 'Three Private Strategy Sessions with Pam',
    desc: 'Analyzing your sphere opportunity, strengthening your outreach rhythm, and improving conversion from conversations to transactions.',
  },
  {
    icon: Target,
    title: 'Sphere Opportunity Audit',
    desc: 'A one-on-one session where we calculate your Sphere Yield and identify the opportunity already inside your network.',
  },
  {
    icon: BarChart3,
    title: 'Founder Data Project',
    desc: 'Contribute anonymized activity and production data so we can continue refining the model.',
  },
  {
    icon: Award,
    title: 'Founder Recognition',
    desc: 'Founders will always be recognized as the first group who helped bring SphereSync into the industry.',
  },
];

const onboardingSteps = [
  { step: 1, title: 'Sphere Opportunity Audit', desc: 'Measure the opportunity already inside your sphere.' },
  { step: 2, title: 'Structure Your Sphere', desc: 'We organize contacts into your 13-week activation cycle.' },
  { step: 3, title: 'Start the Weekly Rhythm', desc: 'Activate the segment of your sphere each week.' },
  { step: 4, title: 'Track Momentum', desc: 'Watch conversations and opportunities build week after week.' },
];

const pricingIncludes = [
  'Six months of SphereSync access',
  'Weekly implementation office hours',
  'Three private strategy sessions with Pam',
  'Participation in the Founder data project',
  'Access to the Founder Cohort Yield Challenge',
];

const idealFounders = [
  'Solo agents or small teams',
  'Agents with meaningful relationships in their sphere',
  'Agents who believe client referrals should be their primary source of business',
  'Agents willing to implement a consistent weekly rhythm',
  'Agents interested in helping prove the relationship model still works',
];

/* ─── CTA Components ─── */
const PrimaryCTA = ({ label = 'Apply for Founder Access' }: { label?: string }) => (
  <Button asChild size="lg" className="h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
    <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
      {label} <ArrowRight className="ml-2 h-5 w-5" />
    </a>
  </Button>
);

const SectionCTA = ({ label = 'Apply for Founder Access' }: { label?: string }) => (
  <div className="flex flex-col items-center gap-3 pt-8">
    <PrimaryCTA label={label} />
    <p className="text-sm text-muted-foreground">Limited to 50 Founders</p>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */

const SphereSyncFounders = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile();

  const dbGap = useInView(0.15);
  const inactionCost = useInView(0.15);
  const pamNote = useInView(0.1);
  const dataBehind = useInView(0.15);
  const whyMatters = useInView(0.15);
  const rallyLine = useInView(0.15);
  const system = useInView(0.15);
  const cycle = useInView(0.15);
  const cohort = useInView(0.1);
  const receives = useInView(0.1);
  const onboarding = useInView(0.1);
  const pricing = useInView(0.1);
  const whoFor = useInView(0.15);
  const finalCta = useInView(0.15);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (visible: boolean) =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <>
      <SEO
        title="SphereSync Founders — 50 Agents Proving the Relationship Model"
        description="Join the first 50 agents implementing SphereSync to prove how powerful a well-activated sphere can be at generating referrals. Founder cohort closes April 15."
        keywords={['SphereSync Founders', 'real estate referrals', 'sphere of influence', 'relationship-driven real estate', 'founder cohort']}
        url="https://reop-website.lovable.app/spheresync-founders"
      />

      <main className="overflow-hidden">
        {/* ═══════ 1 · HERO ═══════ */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 bg-secondary/5">
          {!isMobile && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <LightRays />
            </div>
          )}
          <div className="absolute inset-0 cosmic-gradient opacity-30 pointer-events-none" />

          <div className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1.5 text-sm tracking-wide backdrop-blur-sm">
                SphereSync Founders
              </Badge>
              <Badge variant="outline" className="text-destructive border-destructive/30 px-4 py-1.5 text-sm tracking-wide backdrop-blur-sm">
                Limited to 50 Founders
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-foreground">
              50 agents. Six months.
              <br />
              <span className="text-primary">One goal.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Prove how powerful a well-activated sphere can be at generating referrals.
            </p>

            {/* Decorative divider */}
            <div className="mt-10 mb-10 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-primary/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              <div className="h-px w-12 bg-primary/30" />
            </div>

            {/* Pull quote */}
            <p className="text-lg md:text-xl text-foreground font-semibold leading-relaxed max-w-xl mx-auto">
              Relationships should still win.
            </p>
            <p className="mt-2 text-lg md:text-xl text-primary font-medium max-w-xl mx-auto">
              SphereSync Founders are the agents proving that they do.
            </p>

            {/* CTA */}
            <div className="mt-12">
              <PrimaryCTA />
              <p className="text-sm text-muted-foreground mt-4 tracking-wide">
                Founder enrollment closes April 15 or when the cohort fills.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 2 · THE DATABASE GAP ═══════ */}
        <section ref={dbGap.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(dbGap.visible)}`}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Right now, someone in your sphere is buying or selling a home. They're not calling you — not because you did anything wrong, but because someone else stayed in touch and you didn't. SphereSync is the system that makes sure that stops happening.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              The <span className="text-primary">Database Gap</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                80% of your past clients say they'd use you again. Most of them won't.
              </p>
              <p>Not because you failed them. Because you disappeared.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                Every year you go without a system, that gap costs you transactions you already earned.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 3 · WHAT INACTION COSTS ═══════ */}
        <section ref={inactionCost.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto space-y-8 ${fadeIn(inactionCost.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              What Inaction <span className="text-primary">Actually Costs</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The average agent has <span className="text-foreground font-semibold">200–500 people</span> in their sphere.</p>
              <p>At a healthy activation rate — one transaction for every 12 relationships — that database should produce <span className="text-primary font-semibold">17 to 40+ transactions per year.</span></p>
              <p className="text-2xl font-bold text-foreground">Most agents get 3–5.</p>
              <p>The difference isn't skill. It isn't market conditions.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                It's the absence of a system.
              </p>
              <p>Every week without one is a conversation that didn't happen, a referral that went to someone else, a transaction you'll never even know you lost.</p>
            </div>
            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 4 · A NOTE FROM PAM ═══════ */}
        <section ref={pamNote.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-2xl mx-auto space-y-6 ${fadeIn(pamNote.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              A Note from <span className="text-primary">Pam</span>
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed" style={{ letterSpacing: '0.01em' }}>
              <p>For decades I've watched the same pattern play out in real estate.</p>
              <p>Agents work incredibly hard to build relationships, close transactions, and earn trust.</p>
              <p>But without a system for staying visible with their sphere, those relationships slowly drift.</p>
              <p>Not because agents don't care. Because life and business get busy.</p>
              <p>Over the years I've spent a lot of time in rooms with real estate agents — teaching, coaching, and helping them build referral-driven businesses.</p>
              <p>And the same challenge comes up again and again.</p>
              <p className="text-foreground font-medium">Agents know relationships matter. They want to stay connected with their sphere.</p>
              <p>But between compliance concerns like the Do Not Call registry, the constant stream of new tools and tactics, and industry voices telling them to spend half their time creating content, many agents end up overwhelmed.</p>
              <p>They believe in relationships. They just don't have a clear, manageable system for activating them consistently.</p>
              <p>In mastermind rooms where agents openly shared their numbers, the pattern became unmistakable:</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                Agents who consistently activate their sphere generate extraordinary referral businesses.
              </p>
              <p>In my own business, that approach produced roughly one transaction for every four relationships in my sphere — an unusually strong ratio, but proof of what a well-activated network can produce.</p>
              <p>But as the industry shifted toward larger teams, lead platforms, and increasingly bloated databases, that discipline began to fade.</p>
              <p>The problem wasn't belief in relationships. It was the lack of a simple system for activating them consistently.</p>
              <p className="text-foreground font-medium">SphereSync was built to restore that structure.</p>
              <p>We're starting with a small Founder cohort so the first group of agents can implement the system, measure the results, and demonstrate what a well-activated sphere can truly produce.</p>
              <p>If you believe relationships should still be the most reliable source of business in real estate, this is where we begin.</p>
              <p className="text-foreground italic text-xl pt-4">— Pam</p>
            </div>
          </div>
        </section>

        {/* ═══════ 5 · THE DATA BEHIND SPHERESYNC ═══════ */}
        <section ref={dataBehind.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto space-y-8 ${fadeIn(dataBehind.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              The Data Behind <span className="text-primary">SphereSync</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>For years the real estate industry understood how powerful a well-nurtured sphere could be.</p>
              <p>In early referral-driven businesses and mastermind groups, strong sphere yield ratios were common — sometimes as high as <span className="text-primary font-semibold">one transaction for every four to six relationships.</span></p>
              <p>But as the industry shifted toward large teams, lead platforms, and increasingly bloated databases, those numbers steadily declined.</p>
              <p>Today many agents are taught to expect one transaction for every twelve relationships or worse.</p>
              <p className="text-foreground font-medium">The question is not whether relationships work. The question is what happens when they are activated consistently again.</p>
              <p>The Founder cohort is designed to test what happens when that model is supported by a clear system.</p>
              <p>Founders will implement the SphereSync rhythm for six months while we track a simple metric:</p>
              <div className="bg-card border border-border/50 rounded-xl p-6 text-center space-y-2">
                <p className="text-2xl font-bold text-primary">Sphere Yield</p>
                <p className="text-foreground">How many relationships produce one transaction.</p>
              </div>
              <p>By collecting anonymized activity and production data, we'll be able to see exactly what happens when agents consistently activate their sphere again.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                The goal isn't just to improve individual businesses. It's to demonstrate what a disciplined relationship-driven business can still produce in today's market.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 6 · WHY THIS MATTERS ═══════ */}
        <section ref={whyMatters.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(whyMatters.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              Why This <span className="text-primary">Matters</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The real estate industry is consolidating.</p>
              <p>Large teams and lead platforms are pushing toward scale and volume.</p>
              <p className="text-foreground font-medium">But there should still be room for a different kind of real estate business.</p>
              <p>A solo agent or small team who becomes the trusted advisor for a close-knit group of people in their sphere.</p>
              <p>The person their community calls when something important happens.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                SphereSync was designed to support that kind of business. SphereSync brings structure back to the relationship-driven model.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 7 · FOUNDERS RALLY LINE ═══════ */}
        <section ref={rallyLine.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-4xl mx-auto text-center space-y-6 ${fadeIn(rallyLine.visible)}`}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              The industry told you to buy leads.{' '}
              <span className="text-primary">Your sphere is sitting there waiting.</span>
            </p>
            <p className="text-xl md:text-2xl text-foreground font-medium">
              SphereSync Founders are done leaving that business on the table.
            </p>
            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 8 · THE SPHERESYNC SYSTEM ═══════ */}
        <section ref={system.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(system.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              The <span className="text-primary">SphereSync</span> System
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>SphereSync combines a structured outreach rhythm, relationship prompts, and a live performance dashboard that tracks your <span className="text-primary font-semibold">Sphere Yield</span> in real time. It is built around three simple behaviors:</p>

              <div className="grid sm:grid-cols-3 gap-4 py-4">
                {[
                  { icon: Zap, label: 'Activate relationships' },
                  { icon: MessageSquare, label: 'Start conversations' },
                  { icon: TrendingUp, label: 'Stay top of mind' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border/50 text-center">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-foreground font-medium">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              <p>When those three things happen consistently, referrals follow.</p>
              <p className="text-sm text-muted-foreground border-l-2 border-border pl-4">
                SphereSync also includes guidance designed to help agents stay compliant with Do Not Call rules and responsible outreach practices, so you can reach out with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 9 · THE 13-WEEK SPHERE CYCLE ═══════ */}
        <section ref={cycle.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto space-y-8 ${fadeIn(cycle.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              The <span className="text-primary">13-Week</span> Sphere Cycle
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>Most agents believe they stay in touch with their sphere.</p>
              <p>But when you ask a simple question — <span className="text-foreground italic">"Are you staying in touch with all of them?"</span></p>
              <p>The answer usually becomes less certain.</p>
              <p className="text-foreground font-medium">SphereSync solves that with a simple 13-week relationship cycle.</p>

              <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
                <p className="text-foreground">Your sphere is divided into <span className="text-primary font-semibold">13 weekly segments.</span></p>
                <p className="text-foreground">Each week you reach out to one segment of your relationships.</p>
                <p className="text-foreground">By the end of 13 weeks, you've connected with every person in your sphere once.</p>
                <p className="text-foreground font-medium">Then the cycle repeats.</p>
              </div>

              <p className="font-medium text-foreground">That means:</p>
              <ul className="space-y-2 pl-1">
                {[
                  'Outreach stays manageable',
                  'Relationships stay active',
                  'Every contact receives meaningful outreach each quarter',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <p>Because when someone suddenly needs an agent, they usually call the one they heard from most recently.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                SphereSync helps make sure that agent is you.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 10 · THE FOUNDERS COHORT + YIELD CHALLENGE ═══════ */}
        <section ref={cohort.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(cohort.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              The <span className="text-primary">Founders Cohort</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The first 50 SphereSync Founders will participate in a six-month implementation cohort.</p>
              <p>This small group will be the first agents running the SphereSync system in their businesses while helping us collect real-world data on what a relationship-driven real estate business can produce.</p>
              <p>During the cohort you will implement the weekly SphereSync rhythm and measure your <span className="text-primary font-semibold">Sphere Yield</span> as your relationships become active again.</p>
              <p className="font-medium text-foreground">At the end of six months you will have a fully functioning relationship-driven system operating inside your business.</p>
            </div>

            <div className="border-t border-border/50 pt-8 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground">
                The Founder Cohort <span className="text-primary">Yield Challenge</span>
              </h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>The 50 Founders will be divided into two cohorts of 25 agents.</p>
                <p>Both groups will implement the SphereSync system over the same six-month period.</p>
                <p>Throughout the program we will track a single metric:</p>

                <div className="bg-card border border-border/50 rounded-xl p-6 text-center space-y-3">
                  <p className="text-2xl font-bold text-primary">Sphere Yield</p>
                  <p className="text-foreground">How many relationships in your sphere it takes to produce one transaction.</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 text-sm">
                    <div className="p-3 rounded-lg bg-primary/5">
                      <p className="text-foreground font-semibold">1 : 15</p>
                      <p className="text-muted-foreground">Starting</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10">
                      <p className="text-foreground font-semibold">1 : 10</p>
                      <p className="text-muted-foreground">Improving</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/20">
                      <p className="text-primary font-semibold">1 : 6</p>
                      <p className="text-muted-foreground">Activated</p>
                    </div>
                  </div>
                </div>

                <p>SphereSync is built around a fundamental reality: a well-activated relationship network should be far more productive than what the industry now expects.</p>
                <p>At the end of six months we'll compare how much each cohort improved their Sphere Yield. The cohort that improves the most will receive a Founder recognition prize.</p>
                <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                  More importantly, the results will help demonstrate what a disciplined relationship-driven business can still produce.
                </p>
              </div>
            </div>

            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 11 · WHAT FOUNDERS RECEIVE ═══════ */}
        <section ref={receives.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-5xl mx-auto space-y-12 ${fadeIn(receives.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                What Founders <span className="text-primary">Receive</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {founderReceives.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={receives.visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                      <CardContent className="p-6 space-y-3">
                        <div className="p-2 rounded-lg bg-primary/10 w-fit">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════ 12 · WHAT HAPPENS WHEN YOU JOIN ═══════ */}
        <section ref={onboarding.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-10 ${fadeIn(onboarding.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                What Happens When <span className="text-primary">You Join</span>
              </h2>
            </div>

            <div className="space-y-6">
              {onboardingSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={onboarding.visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex gap-4 md:gap-6 items-start"
                >
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-lg">
              Typical time commitment: <span className="text-foreground font-semibold">1–2 hours per week.</span>
            </p>

            <div className="text-center pt-4">
              <p className="text-lg text-foreground font-medium italic">
                If the relationship model still matters to you, the Founder cohort is where we begin.
              </p>
            </div>

            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 13 · FOUNDER COHORT INVESTMENT ═══════ */}
        <section ref={pricing.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-lg mx-auto space-y-10 ${fadeIn(pricing.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                Founder Cohort <span className="text-primary">Investment</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                A six-month implementation program designed to activate your sphere and turn your relationships into a consistent source of referrals.
              </p>
            </div>

            <BackgroundGradient className="rounded-2xl p-8 bg-card">
              <div className="text-center space-y-6">
                <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1">
                  SphereSync Founders
                </Badge>
                <div>
                  <span className="text-5xl font-bold text-foreground">$997</span>
                </div>
                <p className="text-muted-foreground text-sm">Six-month implementation program</p>

                <ul className="space-y-3 text-left">
                  {pricingIncludes.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-2">
                  <Button asChild size="lg" className="w-full h-14 text-lg shadow-lg">
                    <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                      Apply for Founder Access
                    </a>
                  </Button>
                </div>

                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <p className="font-medium text-destructive">Limited to 50 Founders</p>
                  <p>After the six-month Founder cohort, members can continue with SphereSync Core if they wish to maintain the system.</p>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        </section>

        {/* ═══════ 14 · WHO IT'S FOR ═══════ */}
        <section ref={whoFor.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(whoFor.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              Who the Founders Program <span className="text-primary">Is For</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground">SphereSync Founders are typically:</p>
              <ul className="space-y-3 pl-1">
                {idealFounders.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════ 15 · FINAL CTA ═══════ */}
        <section ref={finalCta.ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none">
            <div className="w-full h-full opacity-10 bg-primary blur-[120px]" />
          </div>

          <div className={`relative z-10 max-w-3xl mx-auto text-center space-y-8 ${fadeIn(finalCta.visible)}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground leading-tight">
              Every week you wait is a week your sphere{' '}
              <span className="text-primary">hears from someone else.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-destructive border-destructive/30 px-4 py-1.5 text-base font-semibold">
                50 seats
              </Badge>
              <Badge variant="outline" className="text-destructive border-destructive/30 px-4 py-1.5 text-base font-semibold">
                April 15 deadline
              </Badge>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              <p>After April 15, this cohort closes and the Founder pricing disappears.</p>
              <p className="text-foreground font-medium">If relationships are the foundation of your business, now is the time to execute the system that makes them work.</p>
            </div>

            <div className="pt-4">
              <PrimaryCTA />
              <div className="flex flex-col gap-1 mt-4 text-sm text-muted-foreground">
                <p>Limited to 50 Founders</p>
                <p>Enrollment closes April 15</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterMinimal />
    </>
  );
};

export default SphereSyncFounders;
