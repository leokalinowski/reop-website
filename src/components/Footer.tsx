import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone } from 'lucide-react';
const Footer = () => {
  return <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card text-left">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Real Estate on Purpose provides comprehensive done-for-you support and proven systems so you can focus on what you do best — building meaningful client relationships.
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start gap-x-8 gap-y-3">
              <a href="tel:5716037367" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-base">(571) 603-7367</span>
              </a>
              <a href="mailto:info@realestateonpurpose.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-base">info@realestateonpurpose.com</span>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4 text-left">
            <h4 className="font-semibold text-lg text-foreground">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#automated-outreach" className="text-muted-foreground hover:text-primary transition-colors">SphereSync™</a></li>
              <li><a href="#lead-management" className="text-muted-foreground hover:text-primary transition-colors">Database Management</a></li>
              <li><a href="#event-management" className="text-muted-foreground hover:text-primary transition-colors">Client Events</a></li>
              <li><a href="#newsletter-tools" className="text-muted-foreground hover:text-primary transition-colors">Hyperlocal Newsletters</a></li>
              <li><a href="#social-media-tools" className="text-muted-foreground hover:text-primary transition-colors">Social Media Management</a></li>
              <li><a href="#weekly-coaching" className="text-muted-foreground hover:text-primary transition-colors">Weekly Coaching</a></li>
              <li><a href="#transaction-coordination" className="text-muted-foreground hover:text-primary transition-colors">Transaction Coordination</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <h4 className="font-semibold text-lg text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">Free Resources</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/jump-start" className="text-muted-foreground hover:text-primary transition-colors">Jump Start Program</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm text-center md:text-left">
              © 2025 Real Estate on Purpose Team. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-center md:text-left">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/legal-disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Legal Disclaimer</Link>
            </div>
          </div>
          
          {/* Professional Disclaimer */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mb-3">
              Real Estate on Purpose Team provides professional support services to licensed real estate agents. We are not a real estate brokerage. All real estate transactions must be conducted through properly licensed brokerages.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
              Individual results may vary. Professional coaching and support services are provided to help agents grow their business within their respective licensed frameworks.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;