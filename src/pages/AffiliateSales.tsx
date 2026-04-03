import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Link2, DollarSign, Megaphone, GraduationCap, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const COMMISSION_PERCENT = 20;
const PRODUCT_PRICE = 997;
const COMMISSION_AMOUNT = Math.round(PRODUCT_PRICE * COMMISSION_PERCENT / 100);

const steps = [
  { icon: Users, title: 'Apply', description: 'Fill out a quick application so we can get to know you.' },
  { icon: Link2, title: 'Get Your Link', description: 'Once approved, you will receive a unique affiliate link and onboarding materials.' },
  { icon: DollarSign, title: 'Earn', description: `Share your link. Every sale you refer earns you $${COMMISSION_AMOUNT}.` },
];

const audiences = [
  { icon: GraduationCap, title: 'Real Estate Coaches & Trainers', description: 'Add SphereSync to your recommended toolstack and earn while you teach.' },
  { icon: Megaphone, title: 'Influencers & Content Creators', description: 'Monetize your real estate audience with a product that actually delivers.' },
  { icon: Heart, title: 'Community Leaders & Team Leads', description: 'Help your network level up — and get rewarded for every referral.' },
  { icon: Users, title: 'Current REOP Members', description: 'Already love SphereSync? Share it with peers and earn commissions.' },
];

const AffiliateSales = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Become a SphereSync Affiliate | Earn $199 Per Referral"
        description={`Join the SphereSync affiliate program. Earn ${COMMISSION_PERCENT}% commission ($${COMMISSION_AMOUNT}) for every founding member you refer. Perfect for real estate coaches, influencers, and community leaders.`}
        keywords={["SphereSync affiliate", "real estate affiliate program", "earn commissions", "referral program"]}
      />

      <Navigation />

      {/* Hero */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-muted border border-border rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase text-primary">Affiliate Program</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
          Earn <em className="text-primary italic">${COMMISSION_AMOUNT}</em> for Every Agent You Refer
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Partner with Real Estate on Purpose and earn {COMMISSION_PERCENT}% commission on every SphereSync Founding Table membership you refer — a ${PRODUCT_PRICE} product built for serious agents.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link to="/affiliate/apply">
            Apply Now <ArrowRight className="h-5 w-5 ml-1" />
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

      {/* Commission Breakdown */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-50">
            The Numbers
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 border border-white/15 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">${PRODUCT_PRICE}</div>
              <div className="text-sm text-slate-300">Product Price</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-6">
              <div className="text-3xl font-bold text-accent mb-1">{COMMISSION_PERCENT}%</div>
              <div className="text-sm text-slate-300">Your Commission</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">${COMMISSION_AMOUNT}</div>
              <div className="text-sm text-slate-300">Per Referral</div>
            </div>
          </div>
          <p className="text-slate-300">
            Refer just 5 agents and earn <strong className="text-slate-50">${COMMISSION_AMOUNT * 5}</strong>. No cap on earnings.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-foreground">
            What You Get as an Affiliate
          </h2>
          <div className="space-y-4">
            {[
              'Unique tracking link managed through our affiliate dashboard',
              'Marketing assets — copy, images, and email templates',
              'Real-time commission tracking in your affiliate portal',
              'Dedicated support from the REOP team',
              'Early access to new products and promotions',
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
            Ready to Start Earning?
          </h2>
          <p className="text-muted-foreground mb-8">
            Apply today and start earning ${COMMISSION_AMOUNT} for every agent you refer to SphereSync.
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
