import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone } from 'lucide-react';
const Footer = () => {
  return <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Join the Real Estate on Purpose Team and experience comprehensive support, proven systems, and expert guidance without any financial burden. We help you perform at a higher level by focusing on what matters most – building meaningful client relationships.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">(571) 603-7367</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">info@realestateonpurpose.com</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-foreground">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#automated-outreach" className="text-muted-foreground hover:text-primary transition-colors">Automated Outreach</a></li>
              <li><a href="#lead-management" className="text-muted-foreground hover:text-primary transition-colors">Lead Management</a></li>
              <li><a href="#event-management" className="text-muted-foreground hover:text-primary transition-colors">Event Management</a></li>
              <li><a href="#newsletter-tools" className="text-muted-foreground hover:text-primary transition-colors">Newsletter Tools</a></li>
              <li><a href="#social-media" className="text-muted-foreground hover:text-primary transition-colors">Social Media Management</a></li>
              <li><a href="#coaching" className="text-muted-foreground hover:text-primary transition-colors">Weekly Coaching</a></li>
              <li><a href="#transaction-coordination" className="text-muted-foreground hover:text-primary transition-colors">Transaction Coordination</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2025 Real Estate on Purpose Team. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/legal-disclaimer" className="text-muted-foreground hover:text-primary transition-colors">Legal Disclaimer</Link>
            </div>
          </div>
          
          {/* Professional Disclaimer */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl">
              Real Estate on Purpose Team provides professional support services to licensed real estate agents. We are not a real estate brokerage. 
              All real estate transactions must be conducted through properly licensed brokerages. Individual results may vary. 
              Professional coaching and support services are provided to help agents grow their business within their respective licensed frameworks.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;