import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import FooterMinimal from '@/components/FooterMinimal';

const AffiliateThankYou = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SEO title="Application Received — SphereSync Affiliate" description="Your affiliate application has been received." />

      <Navigation />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            You're In!
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Your affiliate application has been received. Check your email for next steps — we'll review your application and send you your unique affiliate link, onboarding materials, and marketing assets.
          </p>

          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left space-y-3">
            <h3 className="font-semibold text-foreground mb-3">What to Expect</h3>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-sm">Confirmation email with application details</p>
            </div>
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-sm">Application review within 24–48 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-sm">Affiliate link and portal access upon approval</p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
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
