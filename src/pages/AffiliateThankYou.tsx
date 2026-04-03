import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Logo from '@/components/Logo';
import FooterMinimal from '@/components/FooterMinimal';

const AffiliateThankYou = () => {
  return (
    <div className="min-h-screen bg-[#0E1E2B] text-white flex flex-col" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <SEO title="Application Received — SphereSync Affiliate" description="Your affiliate application has been received." />

      <header className="py-4 px-6 flex justify-center">
        <Logo />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-[#0B8F8F]/20 border border-[#0B8F8F]/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-[#0AADAD]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: "'Lora', serif" }}>
            You're In!
          </h1>
          <p className="text-[#9AAAB8] font-light leading-relaxed mb-8">
            Your affiliate application has been received. Check your email for next steps — we'll review your application and send you your unique affiliate link, onboarding materials, and marketing assets.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 text-left space-y-3">
            <h3 className="font-medium text-white mb-3">What to Expect</h3>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#0AADAD] mt-0.5 shrink-0" />
              <p className="text-[#9AAAB8] text-sm font-light">Confirmation email with application details</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-[#0AADAD] mt-0.5 shrink-0" />
              <p className="text-[#9AAAB8] text-sm font-light">Application review within 24–48 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-[#0AADAD] mt-0.5 shrink-0" />
              <p className="text-[#9AAAB8] text-sm font-light">Affiliate link and portal access upon approval</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#0AADAD] hover:text-white transition-colors text-sm"
          >
            Back to realestateonpurpose.com <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <FooterMinimal />
    </div>
  );
};

export default AffiliateThankYou;
