import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Link2, DollarSign, Megaphone, GraduationCap, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';
import FooterMinimal from '@/components/FooterMinimal';

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
    <div className="min-h-screen bg-[#0E1E2B] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SEO
        title="Become a SphereSync Affiliate | Earn $199 Per Referral"
        description={`Join the SphereSync affiliate program. Earn ${COMMISSION_PERCENT}% commission ($${COMMISSION_AMOUNT}) for every founding member you refer. Perfect for real estate coaches, influencers, and community leaders.`}
        keywords="SphereSync affiliate, real estate affiliate program, earn commissions, referral program"
      />

      {/* Header */}
      <header className="py-4 px-6 flex justify-center">
        <Logo />
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#0B8F8F]/15 border border-[#0B8F8F]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-[#0AADAD] rounded-full animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase text-[#0AADAD]">Affiliate Program</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ fontFamily: "'Lora', serif" }}>
          Earn <em className="text-[#0AADAD] italic">${COMMISSION_AMOUNT}</em> for Every Agent You Refer
        </h1>
        <p className="text-lg md:text-xl text-[#9AAAB8] max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Partner with Real Estate on Purpose and earn {COMMISSION_PERCENT}% commission on every SphereSync Founding Table membership you refer — a ${PRODUCT_PRICE} product built for serious agents.
        </p>
        <Link
          to="/affiliate/apply"
          className="inline-flex items-center gap-2 bg-[#0B8F8F] hover:bg-[#0AADAD] text-white px-8 py-4 rounded font-medium text-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(11,143,143,0.28)]"
        >
          Apply Now <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-light mb-12" style={{ fontFamily: "'Lora', serif" }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#0B8F8F]/15 border border-[#0B8F8F]/30 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-[#0AADAD]" />
                </div>
                <div className="text-xs font-medium tracking-wider uppercase text-[#B8892A] mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-[#9AAAB8] font-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Breakdown */}
      <section className="py-16 px-6 bg-white/[0.03]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-8" style={{ fontFamily: "'Lora', serif" }}>
            The Numbers
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-[#0AADAD] mb-1">${PRODUCT_PRICE}</div>
              <div className="text-sm text-[#9AAAB8]">Product Price</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-[#B8892A] mb-1">{COMMISSION_PERCENT}%</div>
              <div className="text-sm text-[#9AAAB8]">Your Commission</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-[#99ca3c] mb-1">${COMMISSION_AMOUNT}</div>
              <div className="text-sm text-[#9AAAB8]">Per Referral</div>
            </div>
          </div>
          <p className="text-[#9AAAB8] font-light">
            Refer just 5 agents and earn <strong className="text-white">${COMMISSION_AMOUNT * 5}</strong>. No cap on earnings.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-light mb-10" style={{ fontFamily: "'Lora', serif" }}>
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
                <CheckCircle className="h-5 w-5 text-[#0AADAD] mt-0.5 shrink-0" />
                <p className="text-[#C8D8E8] font-light">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-6 bg-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-light mb-12" style={{ fontFamily: "'Lora', serif" }}>
            Who This Is For
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {audiences.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <item.icon className="h-8 w-8 text-[#0AADAD] mb-3" />
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-[#9AAAB8] font-light text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-4" style={{ fontFamily: "'Lora', serif" }}>
            Ready to Start Earning?
          </h2>
          <p className="text-[#9AAAB8] font-light mb-8">
            Apply today and start earning ${COMMISSION_AMOUNT} for every agent you refer to SphereSync.
          </p>
          <Link
            to="/affiliate/apply"
            className="inline-flex items-center gap-2 bg-[#0B8F8F] hover:bg-[#0AADAD] text-white px-8 py-4 rounded font-medium text-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(11,143,143,0.28)]"
          >
            Apply for the Affiliate Program <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <FooterMinimal />
    </div>
  );
};

export default AffiliateSales;
