import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Database, CalendarCheck, BarChart3, FileText, MessageSquare, ShieldCheck,
  CheckCircle2, XCircle, Play, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import Navigation from '@/components/Navigation';
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

const CHECKOUT_URL = '#';
const VIDEO_URL = '#';

/* ─── Data ─── */
const steps = [
  {
    icon: Database,
    title: 'Clean up your database',
    body: 'Organize your contacts so you are not working from a mess. Core includes a database clean-up system built specifically around this need.',
  },
  {
    icon: CalendarCheck,
    title: 'Follow your weekly follow-up plan',
    body: 'Use a weekly outreach structure with to-dos so you always know who to contact and when.',
  },
  {
    icon: FileText,
    title: 'Use templates when you need help',
    body: 'Get newsletter templates plus support around what to say and how to keep follow-up moving.',
  },
  {
    icon: BarChart3,
    title: 'Track your progress',
    body: 'See your activity clearly with a scoreboard and simple reporting so you can build momentum week after week.',
  },
];

const features = [
  { icon: CalendarCheck, title: 'Weekly Follow-Up Plan', desc: 'A weekly sphere outreach structure with clear to-dos.' },
  { icon: Database, title: 'Database Cleanup Tools', desc: 'A system for cleaning up and organizing your contact list.' },
  { icon: BarChart3, title: 'Progress Tracker', desc: 'A scoreboard to help you see activity and keep momentum going.' },
  { icon: ShieldCheck, title: 'Built With Compliance in Mind', desc: 'A DNC-compliant system designed to support safer outreach habits.' },
  { icon: FileText, title: 'Newsletter Templates', desc: 'Ready-to-use templates to help you stay visible with your sphere.' },
  { icon: MessageSquare, title: 'Help With What to Say', desc: 'Access to courses and support around conversations, timing, and follow-up.' },
];

const idealFor = [
  'Solo agents and small teams',
  'Agents with a real database of past clients and sphere contacts',
  'Agents who feel inconsistent with follow-up',
  'Agents juggling too many disconnected tools',
  'Agents who want structure and systems, not another random content subscription',
];

const faqs = [
  {
    q: 'Do I need to switch CRMs?',
    a: 'No. SphereSync is built to work as a layer on top of your existing CRM, not replace it.',
  },
  {
    q: 'Is this only for agents with a big database?',
    a: 'No, but it is best for agents who already have meaningful relationships, past clients, and sphere contacts they want to stay in touch with.',
  },
  {
    q: 'What if I already feel overwhelmed?',
    a: 'That is one of the reasons this exists. SphereSync is designed as a time-saver that reduces decision fatigue and helps replace scattered tools.',
  },
  {
    q: 'Is this compliant?',
    a: 'Core includes a DNC-compliant system intended to support safer outreach habits.',
  },
  {
    q: 'What makes this different from another content tool?',
    a: 'SphereSync is not just giving you more content. It is built to help you stay in touch more consistently and create more follow-through with the people already in your database.',
  },
];

const pricingFeatures = [
  'Weekly follow-up plan',
  'Database cleanup tools',
  'Progress tracker',
  'Newsletter templates',
  'Help with what to say',
  'Basic activity reporting',
  'Built with compliance in mind',
];

/* ─── Shared CTA buttons ─── */
const PrimaryCTA = ({ label = 'Start My Weekly Follow-Up System' }: { label?: string }) => (
  <Button asChild size="lg" className="h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
      {label} <ArrowRight className="ml-2 h-5 w-5" />
    </a>
  </Button>
);

const SecondaryCTA = () => (
  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
    <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer">
      <Play className="mr-2 h-5 w-5" /> Watch the Overview
    </a>
  </Button>
);

const SectionCTA = ({ label }: { label: string }) => (
  <div className="flex justify-center pt-8">
    <PrimaryCTA label={label} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */

const SphereSync = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile();

  const problem = useInView(0.15);
  const cost = useInView(0.15);
  const solution = useInView(0.15);
  const howItWorks = useInView(0.1);
  const whatYouGet = useInView(0.1);
  const different = useInView(0.15);
  const whoFor = useInView(0.15);
  const value = useInView(0.15);
  const pricing = useInView(0.1);
  const faq = useInView(0.1);
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
        title="SphereSync Core — Weekly Follow-Up System for Real Estate Agents"
        description="Stop losing business from your sphere. SphereSync Core gives agents a simple weekly follow-up system to clean up their database, stay in touch, and create more repeat and referral business."
        keywords={['sphere follow-up', 'real estate follow-up system', 'database management', 'sphere of influence', 'repeat referral business']}
        url="https://reop-website.lovable.app/spheresync"
      />

      <Navigation />

      <main className="overflow-hidden">
        {/* ═══════ 1 · HERO ═══════ */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-12">
          {!isMobile && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <LightRays />
            </div>
          )}
          <div className="absolute inset-0 cosmic-gradient opacity-40 pointer-events-none" />

          <div className={`relative z-10 max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1 text-sm tracking-wide">
              SphereSync Core
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-foreground">
              Stop Losing Business From Your Sphere to{' '}
              <span className="text-primary">Other Agents</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              SphereSync Core gives real estate agents a simple weekly follow-up system to clean up their database, stay in touch with past clients and their sphere, and create more repeat and referral business.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <PrimaryCTA />
              <SecondaryCTA />
            </div>

            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Built for agents who already have contacts, conversations, and past clients — but need a better system for staying in touch consistently.
            </p>
          </div>
        </section>

        {/* ═══════ 2 · THE PROBLEM ═══════ */}
        <section ref={problem.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(problem.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              You already know enough people to do{' '}
              <span className="text-primary">more business.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>For most agents, the issue is not that they do not know enough people.</p>
              <p className="font-medium text-foreground">The issue is that follow-up gets inconsistent.</p>
              <ul className="space-y-2 pl-1">
                {[
                  'Your database gets messy.',
                  'Past clients go quiet.',
                  'You mean to reach out, but the week gets away from you.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Then someone you know buys, sells, or refers business… and{' '}
                <em className="text-foreground">another agent gets the call.</em>
              </p>
              <p>Not because they are better. Not because you were not capable.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                Because they stayed in touch — and you did not.
              </p>
              <p>That is the kind of business SphereSync Core is built to help you keep.</p>
            </div>
            <SectionCTA label="See How SphereSync Works" />
          </div>
        </section>

        {/* ═══════ 3 · THE REAL COST ═══════ */}
        <section ref={cost.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto space-y-8 ${fadeIn(cost.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              When you stop showing up,{' '}
              <span className="text-primary">other agents step in.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Every name in your phone, every past client, every warm contact, and every person in your sphere represents{' '}
                <span className="text-foreground font-medium">work you have already done.</span>
              </p>
              <p>You earned those relationships through conversations, service, closings, trust, and time.</p>
              <p>But relationships do not stay warm on their own.</p>
              <p>
                If there is no system for keeping up with people, it gets easier and easier for another agent to become the one they think of first.
              </p>
              <p className="italic text-foreground/80 border-l-2 border-primary pl-4">
                SphereSync was built around a simple belief: you should not lose repeat or referral business just because you did not have a weekly system for follow-up.
              </p>
              <p className="font-medium text-foreground">
                More deals from people who already know you — not just more leads from ads.
              </p>
            </div>
            <SectionCTA label="Keep More Business in Your World" />
          </div>
        </section>

        {/* ═══════ 4 · THE SOLUTION ═══════ */}
        <section ref={solution.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(solution.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              A simple weekly system for staying in touch{' '}
              <span className="text-primary">without winging it</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>SphereSync Core is not here to replace your CRM.</p>
              <p>It is here to help you actually use the relationships you already have.</p>
              <p>Instead of wondering who to reach out to, what to say, or whether you are doing enough, SphereSync gives you a simpler weekly plan for follow-up.</p>
              <p className="font-medium text-foreground">So instead of:</p>
              <ul className="space-y-2 pl-1">
                {[
                  'Forgetting to check in',
                  'Bouncing between disconnected tools',
                  'Putting outreach off until "later"',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>…you have a clear system to help you keep moving.</p>
            </div>
            <SectionCTA label="Start With Core" />
          </div>
        </section>

        {/* ═══════ 5 · HOW IT WORKS ═══════ */}
        <section ref={howItWorks.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-5xl mx-auto space-y-12 ${fadeIn(howItWorks.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                How <span className="text-primary">SphereSync Core</span> Works
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={howItWorks.visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                  >
                    <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                            {i + 1}
                          </div>
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-muted-foreground text-lg italic">
              No guessing. No rebuilding your plan every Monday. Just a clearer way to stay in touch.
            </p>
            <SectionCTA label="Get Started" />
          </div>
        </section>

        {/* ═══════ 6 · WHAT YOU GET ═══════ */}
        <section ref={whatYouGet.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-5xl mx-auto space-y-12 ${fadeIn(whatYouGet.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                What's Included in <span className="text-primary">SphereSync Core</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything in Core is built to help you stay in touch more consistently and make better use of the database you already have.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={whatYouGet.visible ? { opacity: 1, y: 0 } : {}}
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
            <SectionCTA label="See Pricing" />
          </div>
        </section>

        {/* ═══════ 7 · WHY IT'S DIFFERENT ═══════ */}
        <section ref={different.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto space-y-8 ${fadeIn(different.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              Most tools help you store contacts.{' '}
              <span className="text-primary">SphereSync helps you stay in touch.</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>A lot of agents already have tools. They have a CRM. They may have email software. They may have content from their brokerage or another subscription.</p>
              <p>What they usually do not have is <span className="text-foreground font-medium">one simple system that helps them follow up consistently.</span></p>
              <p>SphereSync is different because it is built around the people already in your world.</p>
              <p>It is designed to help you get more business from:</p>
              <ul className="space-y-2 pl-1">
                {['Past clients', 'Your sphere', 'Warm relationships', 'People who already know your name'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                Database-first, not lead-first — built for agents who value relationships over chasing more leads.
              </p>
            </div>
            <SectionCTA label="Use the System Built for Follow-Up" />
          </div>
        </section>

        {/* ═══════ 8 · WHO IT'S FOR ═══════ */}
        <section ref={whoFor.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(whoFor.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              SphereSync Core is for agents who know follow-up matters —{' '}
              <span className="text-primary">but need a better system for doing it</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground">SphereSync Core is best for:</p>
              <ul className="space-y-3 pl-1">
                {idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm italic text-muted-foreground border-l-2 border-border pl-4 mt-6">
                If you are looking for a full done-for-you marketing service or a CRM replacement, Core is probably not the right fit.
              </p>
            </div>
            <SectionCTA label="Start With Core" />
          </div>
        </section>

        {/* ═══════ 9 · THE VALUE ═══════ */}
        <section ref={value.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto text-center space-y-8 ${fadeIn(value.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              This does not need to change everything to{' '}
              <span className="text-primary">be worth it</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed text-left max-w-2xl mx-auto">
              <p>SphereSync does not need to magically transform your entire business to make sense.</p>
              <p>If it helps you stay top of mind with the people already in your world…</p>
              <p>If it helps you follow up more consistently…</p>
              <p>If it helps you win even <span className="text-foreground font-medium">one more repeat or referral deal…</span></p>
              <p>…it can pay for itself many times over.</p>
            </div>
            <p className="italic text-foreground/80 text-lg border-l-2 border-primary pl-4 text-left max-w-2xl mx-auto">
              The goal is simple: keep your database active, keep your name in the conversation, and keep more business from slipping away.
            </p>
            <SectionCTA label="Protect the Business You Already Earned" />
          </div>
        </section>

        {/* ═══════ 10 · PRICING ═══════ */}
        <section ref={pricing.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-lg mx-auto space-y-10 ${fadeIn(pricing.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                Simple pricing for a <span className="text-primary">simple system</span>
              </h2>
            </div>

            <BackgroundGradient className="rounded-2xl p-8 bg-card">
              <div className="text-center space-y-6">
                <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1">
                  SphereSync Core
                </Badge>
                <div>
                  <span className="text-5xl font-bold text-foreground">$149</span>
                  <span className="text-muted-foreground text-lg">/month</span>
                </div>
                <p className="text-muted-foreground">or <span className="font-semibold text-foreground">$1,490/year</span></p>

                <ul className="space-y-3 text-left">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-2">
                  <Button asChild size="lg" className="w-full h-14 text-lg shadow-lg">
                    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                      Start With Core
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full h-12">
                    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                      Choose Annual and Save
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Built for agents who want a cleaner database, better follow-up, and more consistent contact with their sphere.
                </p>
              </div>
            </BackgroundGradient>
          </div>
        </section>

        {/* ═══════ 11 · FAQ ═══════ */}
        <section ref={faq.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-3xl mx-auto space-y-10 ${fadeIn(faq.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-lg text-foreground">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <SectionCTA label="Get Started Now" />
          </div>
        </section>

        {/* ═══════ 12 · FINAL CTA ═══════ */}
        <section ref={finalCta.ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none">
            <div className="w-full h-full opacity-10 bg-primary blur-[120px]" />
          </div>

          <div className={`relative z-10 max-w-3xl mx-auto text-center space-y-8 ${fadeIn(finalCta.visible)}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-foreground leading-tight">
              Your sphere should be helping grow your business —{' '}
              <span className="text-primary">not helping other agents grow theirs</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              <p>You already put in the work to build trust. You already earned the relationships. You already know people who could buy, sell, refer, or come back.</p>
              <p>The problem is not always opportunity. Sometimes the problem is simply <span className="text-foreground font-medium">not having a good system to stay in touch.</span></p>
              <p>SphereSync Core helps you fix that with a simple weekly follow-up system built for real estate agents.</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <PrimaryCTA />
              <SecondaryCTA />
            </div>

            <p className="text-sm text-muted-foreground italic">
              No week goes by without meaningful, compliant touches to your sphere.
            </p>
          </div>
        </section>
      </main>

      <FooterMinimal />
    </>
  );
};

export default SphereSync;
