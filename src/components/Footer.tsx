import React from 'react';
import Logo from './Logo';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                <span className="text-sm">info@realestateuppose.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Your City, State 12345</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors group">
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors group">
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors group">
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary hover:text-primary transition-colors group">
                <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
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
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#join-team" className="text-muted-foreground hover:text-primary transition-colors">Join Our Team</a></li>
              <li><a href="#resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</a></li>
              <li><a href="#support" className="text-muted-foreground hover:text-primary transition-colors">Support</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
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
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#legal" className="text-muted-foreground hover:text-primary transition-colors">Legal Disclaimer</a>
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