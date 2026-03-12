import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Database, CalendarCheck, BarChart3, Users, MessageSquare, ShieldCheck,
  CheckCircle2, ArrowRight, Award, Clock, Zap, Target, TrendingUp, UserCheck,
  Play, Eye, PhoneOff, Home, AlertTriangle, Building2, Heart } from
'lucide-react';
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
      ([e]) => {if (e.isIntersecting) {setVisible(true);obs.disconnect();}},
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const APPLY_URL = 'https://buy.stripe.com/14A4gBgz08mGgCx2js0x200';

/* ─── Data ─── */
const founderReceives = [
{ icon: Database, title: 'Six Months of SphereSync', desc: 'Full access to the SphereSync platform while you implement the system.' },
{ icon: Users, title: 'Weekly Office Hours', desc: 'Live working sessions where we help you apply the system and solve real challenges inside your business.' },
{ icon: MessageSquare, title: 'Three Private Strategy Sessions with Pam', desc: 'Focused on: analyzing your sphere opportunity, strengthening your outreach rhythm, and improving conversion from conversations to transactions.' },
{ icon: Target, title: 'Sphere Opportunity Audit', desc: 'A one-on-one session where we calculate your Sphere Yield and identify the opportunity already inside your network.' },
{ icon: BarChart3, title: 'Founder Data Project', desc: 'Contribute anonymized activity and production data so we can continue refining the model.' },
{ icon: Award, title: 'Founder Recognition', desc: 'Founders will always be recognized as the first group who helped bring SphereSync into the industry.' }];


const onboardingSteps = [
{ step: 1, title: 'Sphere Opportunity Audit', desc: 'Measure the opportunity already inside your sphere.' },
{ step: 2, title: 'Structure Your Sphere', desc: 'We organize contacts into your 13-week activation cycle.' },
{ step: 3, title: 'Start the Weekly Rhythm', desc: 'Activate the segment of your sphere each week.' },
{ step: 4, title: 'Track Momentum', desc: 'Watch conversations and opportunities build week after week.' }];


const pricingIncludes = [
'Six months of SphereSync access',
'Weekly implementation office hours',
'Three private strategy sessions with Pam',
'Participation in the Founder data project',
'Access to the Founder Cohort Yield Challenge'];


const idealFounders = [
'Solo agents or small teams',
'Agents with meaningful relationships in their sphere',
'Agents who believe client referrals should be their primary source of business',
'Agents willing to implement a consistent weekly rhythm',
'Agents interested in helping prove the relationship model still works'];


/* ─── CTA Components ─── */
const PrimaryCTA = ({ label = 'Apply for Founder Access' }: {label?: string;}) =>
<Button asChild size="lg" className="h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
    <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
      {label} <ArrowRight className="ml-2 h-5 w-5" />
    </a>
  </Button>;


const SectionCTA = ({ label = 'Apply for Founder Access' }: {label?: string;}) =>
<div className="flex flex-col items-center gap-3 pt-8">
    <PrimaryCTA label={label} />
    <p className="text-sm text-muted-foreground">Limited to 50 Founders</p>
  </div>;


/* ─── 13-Week Wheel Component ─── */
const CycleWheel = () => {
  const segments = Array.from({ length: 13 }, (_, i) => i);
  const highlightIndex = 2; // "This Week"
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {segments.map((i) => {
        const angle = i * 360 / 13 - 90;
        const rad = angle * Math.PI / 180;
        const r = 42; // percentage from center
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        const isActive = i === highlightIndex;
        return (
          <div
            key={i}
            className={`absolute w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 ${
            isActive ?
            'bg-primary text-primary-foreground scale-125 shadow-lg ring-4 ring-primary/30' :
            'bg-card border border-border text-muted-foreground hover:border-primary/40'}`
            }
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
            
            {i + 1}
          </div>);

      })}
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Week</span>
          <span className="text-xl md:text-2xl font-bold text-primary">3</span>
        </div>
      </div>
      {/* "This Week" label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <Badge variant="outline" className="text-primary border-primary/30 text-xs">This Week</Badge>
      </div>
    </div>);

};

/* ─── Network Background SVG ─── */
const NetworkBackground = () =>
<svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="network" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="2" fill="currentColor" className="text-primary" />
        <circle cx="60" cy="30" r="1.5" fill="currentColor" className="text-primary" />
        <circle cx="110" cy="60" r="2" fill="currentColor" className="text-primary" />
        <circle cx="40" cy="90" r="1.5" fill="currentColor" className="text-primary" />
        <circle cx="90" cy="110" r="2" fill="currentColor" className="text-primary" />
        <line x1="10" y1="10" x2="60" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="60" y1="30" x2="110" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="110" y1="60" x2="90" y2="110" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="40" y1="90" x2="10" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        <line x1="40" y1="90" x2="90" y2="110" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#network)" />
  </svg>;


/* ═══════════════════════════════════════════════════════════════ */

const SphereSyncFounders = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const isMobile = useIsMobile();

  const dbGap = useInView(0.15);
  const inactionCost = useInView(0.15);
  const vsl = useInView(0.15);
  const pamNote = useInView(0.1);
  const dataBehind = useInView(0.15);
  const whyMatters = useInView(0.15);
  const rallyLine = useInView(0.15);
  const system = useInView(0.15);
  const cycle = useInView(0.15);
  const cohort = useInView(0.1);
  const yieldChallenge = useInView(0.1);
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
        title="SphereSync Founders — Stop Losing Business From People Who Already Trust You"
        description="SphereSync is the weekly system that helps agents activate their sphere, stay top of mind, and turn existing relationships into consistent referrals and repeat business. Invite-only Founder Access."
        keywords={['SphereSync Founders', 'real estate referrals', 'sphere of influence', 'relationship-driven real estate', 'founder cohort']}
        url="https://reop-website.lovable.app/spheresync-founders" />
      

      <main className="overflow-hidden">

        {/* ═══════ 1 · HERO ═══════ */}
        <section className="relative min-h-[85vh] md:min-h-screen flex items-center px-6 md:px-12 bg-secondary/5 py-10 md:py-0">
          {!isMobile &&
          <div className="absolute inset-0 z-0 pointer-events-none">
              <LightRays />
            </div>
          }
          <div className="absolute inset-0 cosmic-gradient opacity-30 pointer-events-none" />

          <div className={`relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left — Copy */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1.5 text-sm tracking-wide backdrop-blur-sm">
                  Invite-Only Founder Access
                </Badge>
                <Badge variant="outline" className="text-destructive border-destructive/30 px-4 py-1.5 text-sm tracking-wide backdrop-blur-sm">
                  Limited to 50 Seats
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.08] text-foreground">
                Stop losing business from the people who{' '}
                <span className="text-primary">already know and trust you.</span>
              </h1>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px w-12 bg-primary/30" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                <div className="h-px w-12 bg-primary/30" />
              </div>

              <p className="text-lg md:text-xl font-semibold text-foreground">SphereSync is the weekly system that helps agents activate their sphere, stay top of mind, and turn existing relationships into consistent referrals and repeat business.</p>
              <p className="text-sm md:text-base text-muted-foreground">This page is for invite-only Founder Access — early pricing, direct support, and a seat at the table.</p>

              <div className="pt-2">
                <PrimaryCTA />
                <p className="text-sm text-muted-foreground mt-3 tracking-wide">
                  Founder enrollment closes April 15 or when the cohort fills.
                </p>
              </div>

              {/* Narrative copy — below the CTA */}
              <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed pt-2">
                <p>Right now, someone in your sphere is buying or selling a home. They're not calling you. Not because you did anything wrong. Because someone else stayed in touch — and you didn't. SphereSync is the system that makes sure that stops happening.</p>
                <p>This isn't another CRM or marketing platform. It's a system for activating the relationships already inside your business.</p>
                <p className="text-xs md:text-sm text-muted-foreground italic">Built from decades of real estate referral data and real-world agent implementation — not marketing theory.</p>
              </div>

              {/* Mobile-only Sphere Yield stat card */}
              <div className="block md:hidden bg-primary/5 border border-primary/20 rounded-xl p-4 mt-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sphere Yield</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-primary">1:8</span>
                  <span className="text-sm text-accent font-medium pb-0.5">↑ improving</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">1 transaction per 8 relationships</p>
              </div>
            </div>

            {/* Right — Product Mockup */}
            <div className="hidden md:block self-center max-h-[520px]">
              {/* Labels row */}
              <div className="flex gap-2 mb-3">
                {[
                { label: 'Activate Relationships', bg: 'bg-primary text-primary-foreground', delay: 1 },
                { label: 'Start Conversations', bg: 'bg-accent text-accent-foreground', delay: 1.3 },
                { label: 'Stay Top of Mind', bg: 'bg-secondary text-secondary-foreground', delay: 1.6 }].
                map((pill) =>
                <motion.span
                  key={pill.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={heroVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: pill.delay, duration: 0.6 }}
                  className={`${pill.bg} text-xs font-medium px-3 py-1.5 rounded-full shadow-lg`}>
                  
                    {pill.label}
                  </motion.span>
                )}
              </div>

              <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 space-y-3">
                {/* Mock Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/60" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">SphereSync Dashboard</span>
                </div>

                {/* Sphere Yield Stat Card */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sphere Yield</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-primary">1:8</span>
                    <span className="text-sm text-accent font-medium pb-1">↑ improving</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">1 transaction per 8 sphere contacts</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex gap-1">
                    {Array.from({ length: 13 }).map((_, i) =>
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full ${
                      i < 2 ? 'bg-primary' : i === 2 ? 'bg-primary animate-pulse-slow' : 'bg-border'}`
                      } />

                    )}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>Week 1</span>
                    <span>Week 13</span>
                  </div>
                </div>

                {/* Mock contact cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card border border-border/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20" />
                      <span className="text-xs text-foreground font-medium">This Week</span>
                    </div>
                    <p className="text-xs text-muted-foreground">12 contacts to reach</p>
                  </div>
                  <div className="bg-card border border-border/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-accent/20" />
                      <span className="text-xs text-foreground font-medium">Completed</span>
                    </div>
                    <p className="text-xs text-muted-foreground">24 reached so far</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ 2 · THE DATABASE GAP ═══════ */}
        <section ref={dbGap.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-secondary text-secondary-foreground">
          <div className={`relative z-10 max-w-4xl mx-auto space-y-10 ${fadeIn(dbGap.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
              80% of your past clients say they'd use you again.{' '}
              <span className="text-primary">Most of them won't.</span>
            </h2>

            {/* Animated Gauge Visualization */}
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              {[
              { label: '"Would use you again"', value: 80, color: 'text-primary', stroke: 'stroke-primary', trackStroke: 'stroke-primary/20' },
              { label: '"Actually uses you"', value: 14, color: 'text-destructive', stroke: 'stroke-destructive', trackStroke: 'stroke-destructive/20' }].
              map((gauge) => {
                const radius = 70;
                const circumference = 2 * Math.PI * radius * 0.75;
                const offset = circumference - gauge.value / 100 * circumference;
                return (
                  <div key={gauge.label} className="flex flex-col items-center gap-3">
                    <div className="relative w-48 h-48">
                      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-[135deg]">
                        <circle
                          cx="90" cy="90" r={radius}
                          fill="none" strokeWidth="14" strokeLinecap="round"
                          className={gauge.trackStroke}
                          strokeDasharray={circumference}
                          strokeDashoffset={0} />
                        
                        <motion.circle
                          cx="90" cy="90" r={radius}
                          fill="none" strokeWidth="14" strokeLinecap="round"
                          className={gauge.stroke}
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={dbGap.visible ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }} />
                        
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                        <motion.span
                          className={`text-4xl font-bold ${gauge.color}`}
                          initial={{ opacity: 0 }}
                          animate={dbGap.visible ? { opacity: 1 } : {}}
                          transition={{ delay: 0.8, duration: 0.5 }}>
                          
                          {gauge.value === 14 ? '~' : ''}{gauge.value}%
                        </motion.span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-secondary-foreground/80">{gauge.label}</p>
                  </div>);

              })}
            </div>

            <div className="space-y-4 text-lg leading-relaxed opacity-90">
              <p>Not because you failed them. Because you disappeared.</p>
              <p className="font-semibold border-l-2 border-primary pl-4">
                Every year you go without a system, that gap costs you transactions you already earned.
              </p>
            </div>

            {/* Trust Fade Timeline */}
            <div className="grid sm:grid-cols-3 gap-0 pt-6">
              {[
              { icon: CheckCircle2, title: 'Trust earned at closing', desc: 'Client loves you — right now', iconColor: 'text-primary', bg: 'bg-primary/10', borderColor: 'border-primary/30' },
              { icon: Eye, title: 'Visibility fades', desc: 'Weeks pass without contact', iconColor: 'text-accent', bg: 'bg-accent/10', borderColor: 'border-accent/30' },
              { icon: UserCheck, title: 'Another agent stays top of mind', desc: 'Someone else fills the gap', iconColor: 'text-destructive', bg: 'bg-destructive/10', borderColor: 'border-destructive/30' }].
              map((step, i) =>
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={dbGap.visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + i * 0.25, duration: 0.5 }}
                className="relative flex flex-col items-center text-center px-4 py-6">
                
                  {i < 2 &&
                <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                }
                  <div className={`${step.bg} border ${step.borderColor} rounded-2xl p-4 mb-3`}>
                    <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                  </div>
                  <h4 className="font-semibold text-secondary-foreground text-base mb-1">{step.title}</h4>
                  <p className="text-sm text-secondary-foreground/60">{step.desc}</p>
                </motion.div>
              )}
            </div>

            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 3 · WHAT INACTION COSTS ═══════ */}
        <section ref={inactionCost.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-5xl mx-auto space-y-10 ${fadeIn(inactionCost.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight text-center">
              What Inaction <span className="text-primary">Actually Costs</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The average agent has <span className="text-foreground font-semibold">200–500 people</span> in their sphere.</p>
              <p>At a healthy activation rate — one transaction for every 12 relationships — that database should produce <span className="text-primary font-semibold">17 to 40+ transactions per year.</span></p>
              <p className="text-2xl font-bold text-foreground">Most agents get 3–5.</p>
              <p>The difference isn't skill. It isn't market conditions.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">It's the absence of a system.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
              { stat: '200–500', label: 'people in your sphere', color: 'text-foreground' },
              { stat: '17–40+', label: 'potential transactions per year', color: 'text-primary' },
              { stat: '3–5', label: 'actual transactions for many agents', color: 'text-destructive' }].
              map((card) =>
              <div key={card.label} className="bg-card border border-border/50 rounded-xl p-6 text-center space-y-2">
                  <p className={`text-4xl md:text-5xl font-bold ${card.color}`}>{card.stat}</p>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                </div>
              )}
            </div>

            {/* Gap Visualization */}
            <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Actual vs. Potential Transactions</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Potential (activated sphere)</span>
                    <span className="text-primary font-semibold">17–40+</span>
                  </div>
                  <div className="h-3 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Typical (no system)</span>
                    <span className="text-destructive font-semibold">3–5</span>
                  </div>
                  <div className="h-3 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-destructive/70 rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Cost Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
              { icon: MessageSquare, title: 'Missed conversations', desc: 'Contacts you meant to call but never did' },
              { icon: UserCheck, title: 'Referrals that went elsewhere', desc: 'People who chose the agent who stayed in touch' },
              { icon: Home, title: 'Transactions you never knew you lost', desc: 'Deals that happened without you knowing' }].
              map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                    <div className="p-2 rounded-lg bg-destructive/10 shrink-0">
                      <Icon className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{card.title}</p>
                      <p className="text-xs text-muted-foreground">{card.desc}</p>
                    </div>
                  </div>);

              })}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Every week without one is a conversation that didn't happen, a referral that went to someone else, a transaction you'll never even know you lost.
            </p>
          </div>
        </section>

        {/* ═══════ 4 · VSL SECTION ═══════ */}
        <section ref={vsl.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-4xl mx-auto space-y-10 text-center ${fadeIn(vsl.visible)}`}>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">SphereSync
                <span className="text-primary">SphereSync Founders</span> exists
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A short video from Pam on the problem, the model, and why this Founder group matters.
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="relative bg-card border border-border rounded-2xl overflow-hidden aspect-video max-w-3xl mx-auto shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-xl cursor-pointer hover:bg-primary transition-colors">
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 rounded-full">3:42</span>
              </div>
            </div>

            {/* Takeaways */}
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
              { icon: AlertTriangle, text: 'Why agents lose business from their sphere' },
              { icon: CalendarCheck, text: 'How the 13-week rhythm works' },
              { icon: TrendingUp, text: 'What Founders will build in 6 months' }].
              map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-foreground font-medium">{item.text}</p>
                  </div>);

              })}
            </div>

            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 5 · A NOTE FROM PAM ═══════ */}
        <section ref={pamNote.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`relative z-10 max-w-6xl mx-auto ${fadeIn(pamNote.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight mb-10">
              A Note from <span className="text-primary">Pam</span>
            </h2>

            <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-16">
              {/* Left — Photo & signature */}
              <div className="flex flex-col items-center md:items-start gap-6">
                <div className="w-48 h-48 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                  <img
                    src="/images/pamobryant.png"
                    alt="Pam O'Bryant"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  
                </div>
                <div className="text-center md:text-left">
                  <p className="text-foreground font-semibold text-lg">Pam O'Bryant</p>
                  <p className="text-sm text-muted-foreground">Founder & CEO, REOP</p>
                </div>

                {/* Pull-quote on desktop */}
                <div className="hidden md:block bg-primary/5 border-l-4 border-primary rounded-r-xl p-5">
                  <p className="text-sm text-foreground italic leading-relaxed">
                    "The problem wasn't belief in relationships. It was the lack of a simple system for activating them consistently."
                  </p>
                </div>
              </div>

              {/* Right — Full note */}
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

                {/* Pull-quote on mobile */}
                <div className="md:hidden bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 my-6">
                  <p className="text-sm text-foreground italic leading-relaxed">
                    "The problem wasn't belief in relationships. It was the lack of a simple system for activating them consistently."
                  </p>
                </div>

                <p className="text-foreground font-medium">SphereSync was built to restore that structure.</p>
                <p>We're starting with a small Founder cohort so the first group of agents can implement the system, measure the results, and demonstrate what a well-activated sphere can truly produce.</p>
                <p>If you believe relationships should still be the most reliable source of business in real estate, this is where we begin.</p>
                <p className="text-foreground italic text-xl pt-4">— Pam</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ 6 · THE DATA BEHIND SPHERESYNC ═══════ */}
        <section ref={dataBehind.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-5xl mx-auto space-y-10 ${fadeIn(dataBehind.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight text-center">
              The Data Behind <span className="text-primary">SphereSync</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>For years the real estate industry understood how powerful a well-nurtured sphere could be.</p>
              <p>In early referral-driven businesses and mastermind groups, strong sphere yield ratios were common — sometimes as high as <span className="text-primary font-semibold">one transaction for every four to six relationships.</span></p>
              <p>But as the industry shifted toward large teams, lead platforms, and increasingly bloated databases, those numbers steadily declined.</p>
              <p>Today many agents are taught to expect one transaction for every twelve relationships or worse.</p>
              <p className="text-foreground font-medium">The question is not whether relationships work. The question is what happens when they are activated consistently again.</p>
            </div>

            {/* Three-part data story */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-card border border-primary/20 rounded-xl p-6 text-center space-y-3">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 4 }, (_, i) =>
                  <Users key={i} className="h-4 w-4 text-primary" />
                  )}
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">1 : 6-8</p>
                <p className="text-xs text-muted-foreground">Strong yield benchmark</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Historical Best</p>
              </div>
              <div className="bg-card border border-destructive/20 rounded-xl p-6 text-center space-y-3">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 6 }, (_, i) =>
                  <Users key={i} className="h-4 w-4 text-muted-foreground" />
                  )}
                  <ArrowRight className="h-4 w-4 text-muted-foreground mx-1" />
                  <Home className="h-4 w-4 text-destructive" />
                </div>
                <p className="text-2xl font-bold text-destructive">1 : 12+</p>
                <p className="text-xs text-muted-foreground">Current weaker expectation</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Industry Today</p>
              </div>
              <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-6 text-center space-y-3">
                <BarChart3 className="h-8 w-8 text-primary mx-auto" />
                <p className="text-2xl font-bold text-primary">Sphere Yield</p>
                <p className="text-xs text-foreground font-medium">How many relationships produce one transaction</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">What We Measure</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The Founder cohort is designed to test what happens when that model is supported by a clear system.</p>
              <p>Founders will implement the SphereSync rhythm for six months while we track Sphere Yield.</p>
              <p>By collecting anonymized activity and production data, we'll be able to see exactly what happens when agents consistently activate their sphere again.</p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                The goal isn't just to improve individual businesses. It's to demonstrate what a disciplined relationship-driven business can still produce in today's market.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 7 · WHY THIS MATTERS ═══════ */}
        <section ref={whyMatters.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-5xl mx-auto space-y-10 ${fadeIn(whyMatters.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight text-center">
              Why This <span className="text-primary">Matters</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
              <p>The real estate industry is consolidating.</p>
              <p>Large teams and lead platforms are pushing toward scale and volume.</p>
              <p className="text-foreground font-medium">But there should still be room for a different kind of real estate business.</p>
              <p>A solo agent or small team who becomes the trusted advisor for a close-knit group of people in their sphere.</p>
              <p>The person their community calls when something important happens.</p>
            </div>

            {/* Two-column comparison */}
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-card border border-border/50 rounded-xl p-6 text-center space-y-4">
                <Building2 className="h-8 w-8 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-bold text-foreground">Built for Scale</h3>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span>Large teams, high volume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span>Lead platforms & ad spend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">•</span>
                    <span>Quantity-driven model</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center space-y-4">
                <Heart className="h-8 w-8 text-primary mx-auto" />
                <h3 className="text-xl font-bold text-primary">Built on Trust</h3>
                <ul className="space-y-2 text-sm text-foreground text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Solo agents & small teams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Relationship-driven referrals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>Quality-driven model</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom band */}
            <div className="bg-secondary text-secondary-foreground rounded-xl p-6 text-center max-w-3xl mx-auto">
              <p className="text-lg font-semibold">
                SphereSync brings structure back to the relationship-driven model.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 8 · FOUNDERS RALLY LINE ═══════ */}
        <section ref={rallyLine.ref} className="relative py-16 md:py-24 px-6 md:px-12 bg-secondary">
          <div className={`max-w-4xl mx-auto text-center space-y-4 ${fadeIn(rallyLine.visible)}`}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-secondary-foreground leading-tight">
              The industry told you to buy leads.{' '}
              <span className="text-primary">Your sphere is sitting there waiting.</span>
            </p>
            <p className="text-xl md:text-2xl text-secondary-foreground/90 font-medium">
              SphereSync Founders are done leaving that business on the table.
            </p>
          </div>
        </section>

        {/* ═══════ 9 · THE SPHERESYNC SYSTEM ═══════ */}
        <section ref={system.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-5xl mx-auto space-y-10 ${fadeIn(system.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight text-center">
              The <span className="text-primary">SphereSync</span> System
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
              SphereSync combines a structured outreach rhythm, relationship prompts, and a live performance dashboard that tracks your <span className="text-primary font-semibold">Sphere Yield</span> in real time. It is built around three simple behaviors:
            </p>

            {/* Hub and Spoke Diagram */}
            <div className="space-y-8">
              {/* Input Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                { icon: CalendarCheck, title: 'Structured Outreach Rhythm' },
                { icon: MessageSquare, title: 'Relationship Prompts' },
                { icon: BarChart3, title: 'Live Performance Dashboard' }].
                map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border/50 text-center">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-foreground font-medium">{card.title}</p>
                    </div>);

                })}
              </div>

              {/* Connecting lines + center node */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-px h-8 bg-primary/30" />
                  <div className="w-px h-8 bg-primary/30 mx-12 hidden sm:block" />
                  <div className="w-px h-8 bg-primary/30 hidden sm:block" />
                </div>
                <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">SphereSync</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-px h-8 bg-primary/30" />
                  <div className="w-px h-8 bg-primary/30 mx-12 hidden sm:block" />
                  <div className="w-px h-8 bg-primary/30 hidden sm:block" />
                </div>
              </div>

              {/* Output Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                { icon: Zap, label: 'Activate Relationships' },
                { icon: MessageSquare, label: 'Start Conversations' },
                { icon: TrendingUp, label: 'Stay Top of Mind' }].
                map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex flex-col items-center gap-3 p-5 rounded-xl bg-accent/10 border border-accent/20 text-center">
                      <div className="p-3 rounded-lg bg-accent/20">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <p className="text-sm text-foreground font-medium">{item.label}</p>
                    </div>);

                })}
              </div>
            </div>

            {/* Result band */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
              <p className="text-lg text-foreground font-medium">
                When those three things happen consistently, referrals follow.
              </p>
            </div>

            {/* Compliance strip */}
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <p>SphereSync includes guidance to help agents stay compliant with Do Not Call rules and responsible outreach practices.</p>
            </div>
          </div>
        </section>

        {/* ═══════ 10 · THE 13-WEEK SPHERE CYCLE ═══════ */}
        <section ref={cycle.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-5xl mx-auto space-y-10 ${fadeIn(cycle.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight text-center">
              The <span className="text-primary">13-Week</span> Sphere Cycle
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed text-center">
              <p>Most agents believe they stay in touch with their sphere.</p>
              <p>But when you ask a simple question — <span className="text-foreground italic">"Are you staying in touch with all of them?"</span></p>
              <p>The answer usually becomes less certain.</p>
              <p className="text-foreground font-medium">SphereSync solves that with a simple 13-week relationship cycle.</p>
            </div>

            {/* Circular Wheel */}
            <div className="py-8">
              <CycleWheel />
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6 space-y-4 max-w-3xl mx-auto">
              <p className="text-foreground">Your sphere is divided into <span className="text-primary font-semibold">13 weekly segments.</span></p>
              <p className="text-foreground">Each week you reach out to one segment of your relationships.</p>
              <p className="text-foreground">By the end of 13 weeks, you've connected with every person in your sphere once.</p>
              <p className="text-foreground font-medium">Then the cycle repeats.</p>
            </div>

            {/* Benefit cards */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
              'Outreach stays manageable',
              'Relationships stay active',
              'Every contact receives meaningful outreach each quarter'].
              map((item) =>
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Because when someone suddenly needs an agent, they usually call the one they heard from most recently.
            </p>

            {/* Pull-quote band */}
            <div className="bg-secondary text-secondary-foreground rounded-xl p-6 text-center max-w-3xl mx-auto">
              <p className="text-lg font-semibold">
                SphereSync helps make sure that agent is you.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ 11 · THE FOUNDERS COHORT ═══════ */}
        <section ref={cohort.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-5xl mx-auto ${fadeIn(cohort.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight mb-10">
              The <span className="text-primary">Founders Cohort</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Left — Explanation */}
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>The first 50 SphereSync Founders will participate in a six-month implementation cohort.</p>
                <p>This small group will be the first agents running the SphereSync system in their businesses while helping us collect real-world data on what a relationship-driven real estate business can produce.</p>
                <p>During the cohort you will implement the weekly SphereSync rhythm and measure your <span className="text-primary font-semibold">Sphere Yield</span> as your relationships become active again.</p>
                <p className="font-medium text-foreground">At the end of six months you will have a fully functioning relationship-driven system operating inside your business.</p>
              </div>

              {/* Right — Stacked value cards */}
              <div className="space-y-4">
                {[
                { icon: Database, title: 'Full SphereSync Access', desc: '6 months of the complete platform' },
                { icon: CalendarCheck, title: 'Weekly Implementation', desc: 'Guided rhythm with office hours' },
                { icon: BarChart3, title: 'Sphere Yield Tracking', desc: 'Measure your improvement in real time' },
                { icon: Users, title: 'Cohort Community', desc: '50 agents building together' }].
                map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold">{card.title}</p>
                        <p className="text-sm text-muted-foreground">{card.desc}</p>
                      </div>
                    </div>);

                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ 12 · THE FOUNDER COHORT YIELD CHALLENGE ═══════ */}
        <section ref={yieldChallenge.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-4xl mx-auto space-y-10 ${fadeIn(yieldChallenge.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight text-center">
              The Founder Cohort <span className="text-primary">Yield Challenge</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The 50 Founders will be divided into two cohorts of 25 agents.</p>
              <p>Both groups will implement the SphereSync system over the same six-month period.</p>
              <p>Throughout the program we will track a single metric:</p>
            </div>

            {/* Featured Metric */}
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 text-center space-y-3 max-w-md mx-auto shadow-lg">
              <BarChart3 className="h-10 w-10 text-primary mx-auto" />
              <p className="text-3xl font-bold text-primary">Sphere Yield</p>
              <p className="text-foreground">How many relationships in your sphere it takes to produce one transaction.</p>
            </div>

            <p className="text-center text-muted-foreground">Most agents have never measured this number in their business.</p>

            {/* Example ratio pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
              { ratio: '1 : 15', label: 'Starting', bg: 'bg-card border-border/50' },
              { ratio: '1 : 10', label: 'Improving', bg: 'bg-primary/5 border-primary/20' },
              { ratio: '1 : 6', label: 'Activated', bg: 'bg-primary/10 border-primary/30' }].
              map((pill) =>
              <div key={pill.ratio} className={`${pill.bg} border rounded-xl px-6 py-4 text-center`}>
                  <p className="text-2xl font-bold text-foreground">{pill.ratio}</p>
                  <p className="text-xs text-muted-foreground">{pill.label}</p>
                </div>
              )}
            </div>

            <div className="max-w-3xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>SphereSync is built around a fundamental reality: a well-activated relationship network should be far more productive than what the industry now expects.</p>
              <p>At the end of six months we'll compare how much each cohort improved their Sphere Yield. <span className="text-foreground font-semibold">The cohort that improves the most will receive a Founder recognition prize.</span></p>
              <p className="font-semibold text-foreground border-l-2 border-primary pl-4">
                More importantly, the results will help demonstrate what a disciplined relationship-driven business can still produce.
              </p>
            </div>

            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 13 · WHAT FOUNDERS RECEIVE ═══════ */}
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
                    transition={{ duration: 0.5, delay: i * 0.1 }}>
                    
                    <Card className="h-full border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
                      <CardContent className="p-6 space-y-3">
                        <div className="p-2 rounded-lg bg-primary/10 w-fit">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>);

              })}
            </div>
          </div>
        </section>

        {/* ═══════ 14 · WHAT HAPPENS WHEN YOU JOIN ═══════ */}
        <section ref={onboarding.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-10 ${fadeIn(onboarding.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                What Happens When <span className="text-primary">You Join</span>
              </h2>
            </div>

            <div className="space-y-6">
              {onboardingSteps.map((s, i) =>
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                animate={onboarding.visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-4 md:gap-6 items-start">
                
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Time commitment badge */}
            <div className="flex justify-center">
              <Badge variant="outline" className="text-primary border-primary/30 px-5 py-2 text-base">
                <Clock className="h-4 w-4 mr-2" />
                Typical time commitment: 1–2 hours per week
              </Badge>
            </div>

            <div className="text-center pt-4">
              <p className="text-lg text-foreground font-medium italic">
                If the relationship model still matters to you, the Founder cohort is where we begin.
              </p>
            </div>

            <SectionCTA />
          </div>
        </section>

        {/* ═══════ 15 · FOUNDER COHORT INVESTMENT ═══════ */}
        <section ref={pricing.ref} className="relative py-20 md:py-28 px-6 md:px-12">
          <div className={`max-w-lg mx-auto space-y-10 ${fadeIn(pricing.visible)}`}>
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
                Founder Cohort <span className="text-primary">Investment</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                The Founder cohort is a six-month implementation program designed to activate your sphere and turn your relationships into a consistent source of referrals.
              </p>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">
                SphereSync is the platform that supports the process. Founder seats include the full implementation process and direct strategy access during the six-month cohort.
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
                  {pricingIncludes.map((f) =>
                  <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  )}
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
                  <p>Enrollment closes April 15</p>
                  <p className="pt-2">After the six-month Founder cohort, members can continue with SphereSync Core if they wish to maintain the system.</p>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        </section>

        {/* ═══════ 16 · WHO IT'S FOR ═══════ */}
        <section ref={whoFor.ref} className="relative py-20 md:py-28 px-6 md:px-12 bg-primary/5">
          <div className="absolute inset-0 cosmic-grid opacity-5 pointer-events-none" />
          <div className={`relative z-10 max-w-3xl mx-auto space-y-8 ${fadeIn(whoFor.visible)}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground leading-tight">
              Who the Founders Program <span className="text-primary">Is For</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p className="font-medium text-foreground">SphereSync Founders are typically:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {idealFounders.map((item) =>
                <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ 17 · FINAL CTA ═══════ */}
        <section ref={finalCta.ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
          <NetworkBackground />
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
    </>);

};

export default SphereSyncFounders;