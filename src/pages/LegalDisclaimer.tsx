import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Mail, Phone, ArrowLeft } from 'lucide-react';

const LegalDisclaimer = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">Legal Disclaimer</h1>
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Licensing and Brokerage</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Real Estate on Purpose operates under the supervision of licensed real estate brokers in accordance with state and local real estate laws. All real estate services are provided by licensed professionals.
                </p>
                <p>
                  License information and brokerage details are available upon request. We are members in good standing of applicable Multiple Listing Services (MLS) and real estate boards.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">No Guarantee of Results</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>IMPORTANT:</strong> We do not guarantee any specific results, outcomes, or financial returns from our services. Real estate markets are inherently unpredictable, and past performance does not guarantee future results.
                </p>
                <p>
                  Factors affecting real estate transactions include but are not limited to: market conditions, financing availability, property conditions, economic factors, and personal circumstances.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Market Information and Data Accuracy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Property information, market data, and statistics presented on our website are obtained from sources we believe to be reliable, but we do not guarantee their accuracy, completeness, or timeliness.
                </p>
                <p>
                  MLS data is provided for informational purposes only and may not reflect current availability, pricing, or property conditions. All information should be independently verified.
                </p>
                <p>
                  Market analyses and property valuations are estimates based on available data and professional judgment, not formal appraisals.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Educational vs. Professional Advice</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Content on our website, including articles, guides, and coaching materials, is for educational purposes only and does not constitute professional advice for your specific situation.
                </p>
                <p>
                  You should consult with qualified professionals including real estate agents, attorneys, accountants, and financial advisors before making real estate decisions.
                </p>
                <p>
                  Investment strategies and techniques discussed are general in nature and may not be suitable for all investors or situations.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Websites and Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our website may contain links to third-party websites and services. We do not control and are not responsible for the content, accuracy, or practices of these external sites.
                </p>
                <p>
                  References to third-party products, services, or companies do not constitute endorsements or recommendations.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Referrals and Compensation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may receive compensation from recommended service providers, including lenders, inspectors, contractors, and other real estate professionals. These arrangements do not influence our recommendations.
                </p>
                <p>
                  All referral fees and compensation arrangements will be disclosed in accordance with applicable laws and regulations.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Geographic Service Limitations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our services are provided in specific geographic areas where we maintain proper licensing and market expertise. Service availability may vary by location.
                </p>
                <p>
                  Property information and market data may be limited to areas covered by our MLS memberships and local partnerships.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Fair Housing Compliance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Real Estate on Purpose is committed to fair housing practices and equal opportunity. We comply with all federal, state, and local fair housing laws.
                </p>
                <p>
                  We do not discriminate based on race, color, religion, sex, handicap, familial status, national origin, or any other protected characteristic.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Technology and Data Accuracy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our automated outreach, lead management, and other technology tools are provided "as-is" without warranties of any kind. We do not guarantee system availability, data accuracy, or error-free operation.
                </p>
                <p>
                  Users are responsible for verifying all information and maintaining appropriate backups of important data.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Disclaimer</h2>
              <p className="text-muted-foreground">
                This disclaimer may be updated periodically to reflect changes in our services, applicable laws, or industry standards. Please review this page regularly for updates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>For questions about this disclaimer or our services, contact us:</p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>legal@realestateonpurpose.com</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>IMPORTANT NOTICE:</strong> This disclaimer is for informational purposes only and does not constitute legal advice. 
                Consult with qualified legal counsel for specific legal questions related to real estate transactions and professional practices.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalDisclaimer;