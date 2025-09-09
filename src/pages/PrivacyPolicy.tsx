import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Mail, Phone, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Real Estate on Purpose ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Name, email address, and phone number when you contact us</li>
                    <li>Property preferences and requirements</li>
                    <li>Financial qualification information</li>
                    <li>Communication history and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>IP address, browser type, and device information</li>
                    <li>Website usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Search queries and page interactions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and improve our real estate services</li>
                <li>Communicate about properties and market updates</li>
                <li>Qualify leads and match you with suitable properties</li>
                <li>Send marketing communications (with consent)</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Licensed real estate professionals and brokers</li>
                  <li>Third-party service providers (CRM, email marketing, analytics)</li>
                  <li>MLS systems and real estate databases (as required)</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners for referrals (with consent)</li>
                </ul>
                <p>We do not sell your personal information to third parties.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Provide personalized content and advertisements</li>
                  <li>Enable social media features</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain processing activities</li>
                  <li>Request data portability</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">California Privacy Rights (CCPA/CPRA)</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>California residents have additional rights under the CCPA/CPRA:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of the sale of personal information</li>
                  <li>Right to non-discrimination for exercising privacy rights</li>
                  <li>Right to correct inaccurate personal information</li>
                </ul>
                <p>To exercise these rights, contact us using the information below.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>For privacy-related questions or requests, contact us:</p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>(571) 603-7367</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>privacy@realestateonpurpose.com</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new Privacy Policy on this page with an updated "Last Updated" date.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;