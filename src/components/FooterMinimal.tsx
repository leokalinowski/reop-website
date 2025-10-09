import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Mail, Phone } from 'lucide-react';

const FooterMinimal = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-border/50 bg-card/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo />
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">(571) 603-7367</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm">info@realestateonpurpose.com</span>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal-disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
              Legal Disclaimer
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            © 2025 Real Estate on Purpose Team. All rights reserved.
          </div>
          
          {/* Professional Disclaimer */}
          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Real Estate on Purpose Team provides professional support services to licensed real estate agents. 
              We are not a real estate brokerage. All real estate transactions must be conducted through properly 
              licensed brokerages. Individual results may vary.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
