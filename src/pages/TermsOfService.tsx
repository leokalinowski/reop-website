import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Mail, Phone, ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-6 px-6 md:px-12 border-b border-border bg-card">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo />
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using the services of Real Estate on Purpose ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Real Estate on Purpose provides:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Real estate consultation and advisory services</li>
                  <li>Property search and evaluation assistance</li>
                  <li>Market analysis and investment guidance</li>
                  <li>Lead management and automated outreach tools</li>
                  <li>Educational content and coaching programs</li>
                  <li>Transaction coordination support</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate and truthful information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Maintain the confidentiality of your account information</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Prohibited Activities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may not:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use our services for fraudulent or illegal activities</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Harass, abuse, or threaten other users or staff</li>
                  <li>Copy, reproduce, or distribute our proprietary content</li>
                  <li>Use automated systems to access our services without permission</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Relationship</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Use of our website and services does not automatically create a client-agent relationship. A formal agency relationship is established only through a signed representation agreement.
                </p>
                <p>
                  All real estate services are provided through licensed real estate professionals in accordance with state and local regulations.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All content, trademarks, logos, and intellectual property on our website and in our services are owned by Real Estate on Purpose or our licensors. You may not use, copy, or distribute this content without written permission.
                </p>
                <p>
                  MLS data and property information are subject to additional licensing terms and restrictions.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  To the fullest extent permitted by law, Real Estate on Purpose shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                </p>
                <p>
                  Our total liability for any claims arising from these terms or your use of our services shall not exceed the amount you paid for our services in the 12 months preceding the claim.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless Real Estate on Purpose from any claims, damages, losses, or expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Service Modifications</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with or without notice. We may also update these Terms of Service periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
                </p>
                <p>
                  You may terminate your use of our services at any time by discontinuing use of our website and services.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Dispute Resolution</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of [Your State], without regard to conflict of law principles.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>For questions about these Terms of Service, contact us:</p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>(571) 603-7367</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>legal@realestateonpurpose.com</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;