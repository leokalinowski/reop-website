import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Link2, DollarSign, Megaphone, GraduationCap, Heart, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const COMMISSION_PERCENT = 20;
const MONTHLY_PRICE = 149;
const MONTHLY_COMMISSION = Math.round(MONTHLY_PRICE * COMMISSION_PERCENT / 100);
const FOUNDING_PRICE = 997;
const FOUNDING_COMMISSION = Math.round(FOUNDING_PRICE * COMMISSION_PERCENT / 100);

const steps = [
  { icon: Link2, title: 'Share', description: 'Share your unique affiliate link with your audience.' },
  { icon: Users, title: 'They Join', description: 'When someone signs up for SphereSync through your link, you get credit.' },
  { icon: TrendingUp, title: 'You Earn', description: 'Earn 20% of their subscription — every month they stay.' },
];

const earningsExamples = [
  { referrals: 5, monthly: MONTHLY_COMMISSION * 5, annual: MONTHLY_COMMISSION * 5 * 12 },
  { referrals: 10, monthly: MONTHLY_COMMISSION * 10, annual: MONTHLY_COMMISSION * 10 * 12 },
  { referrals: 25, monthly: MONTHLY_COMMISSION * 25, annual: MONTHLY_COMMISSION * 25 * 12 },
  { referrals: 50, monthly: MONTHLY_COMMISSION * 50, annual: MONTHLY_COMMISSION * 50 * 12 },
];

const audiences = [
  { icon: GraduationCap, title: 'Real Estate Coaches & Trainers', description: 'Recommend SphereSync and earn recurring revenue while you teach.' },
  { icon: Megaphone, title: 'Influencers & Content Creators', description: 'Monetize your real estate audience with compounding monthly income.' },
  { icon: Heart, title: 'Community Leaders & Team Leads', description: 'Help your network level up — and build a recurring income stream.' },
  { icon: Users, title: 'Current REOP Members', description: 'Already love SphereSync? Share it and earn every month.' },
];

const AffiliateSales = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Become a SphereSync Affiliate | Earn 20% Recurring Revenue"
        description="Join the SphereSync affiliate program. Earn 20% recurring commissions on every referral — every month, for life. Perfect for real estate coaches, influencers, and community leaders."
        keywords={["SphereSync affiliate", "real estate affiliate program", "recurring commissions", "referral program"]}
      />

      <Navigation />

      {/* Hero */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase text-primary">Affiliate Program</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
          Earn <em className="text-primary italic">20% Recurring Revenue</em> on Every Referral
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Earn 20% of their subscription, every month, for life.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link to="/affiliate/apply">
            Apply to Become an Affiliate <ArrowRight className="h-5 w-5 ml-1" />
          </Link>
        </Button>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-foreground">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center bg-card border border-border rounded-xl p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-xs font-medium tracking-wider uppercase text-accent mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Potential */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-50">
            Your Earnings Potential
          </h2>
          <div className="overflow-hidden rounded-xl border border-white/15 mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-6 py-3 text-sm font-semibold text-slate-200">Referrals</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-200">Monthly Income</th>
                  <th className="px-6 py-3 text-sm font-semibold text-slate-200">Annual Income</th>
                </tr>
              </thead>
              <tbody>
                {earningsExamples.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white/5' : 'bg-white/[0.02]'}>
                    <td className="px-6 py-4 text-slate-300 font-medium">{row.referrals}</td>
                    <td className="px-6 py-4 text-primary font-bold">~${row.monthly.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-50 font-bold">~${row.annual.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Based on 20% of a ~$149/mo subscription. This is recurring — your income grows as long as your referrals stay. SphereSync is built for long-term members, not one-time buyers.
          </p>
        </div>
      </section>

      {/* Founding Bonus */}
      <section className="py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-muted border border-border rounded-xl p-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Founding Launch Bonus:</strong> Right now, SphereSync is enrolling Founders at ${FOUNDING_PRICE} for 6 months. You earn ${FOUNDING_COMMISSION} (20%) on every Founding enrollment you refer. From month 7 onward, they move to ${MONTHLY_PRICE}/mo — and you earn 20% of that, every month, for life.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Is Easy to Promote */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-foreground">
            Why This Is Easy to Promote
          </h2>
          <div className="space-y-4">
            {[
              'Clear niche — built exclusively for real estate agents',
              'Strong product-market fit — agents need this, and they know it',
              'Recurring revenue model — you earn as long as they stay',
              'High customer lifetime value — SphereSync is a system, not a tool they churn from',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-12 text-foreground">
            Who This Is For
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {audiences.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Build Recurring Income?
          </h2>
          <p className="text-muted-foreground mb-8">
            Apply today. Every referral earns you 20% — every month, for as long as they're a member.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/affiliate/apply">
              Apply for the Affiliate Program <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AffiliateSales;
