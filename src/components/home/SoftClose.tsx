import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

const quickLinks = [
  { label: "Agent Systems Starter Pack", href: "#starter-pack" },
  { label: "DIY Access", href: "#diy" },
  { label: "Supported Agent Model", href: "#supported" },
  { label: "Blog / Market Insights", href: "/blog" },
  { label: "About REOP", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:hello@reop.com", label: "Email" },
];

const SoftClose = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <div className="text-center mb-12">
          <p className="text-2xl md:text-3xl font-medium italic text-primary-foreground">
            "Your Command Center for a Profitable, Joyful Real Estate Business."
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm md:text-base text-secondary-foreground/80 hover:text-primary-foreground transition-colors text-center md:text-left"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Bar */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Fine Print */}
        <div className="text-center text-sm text-secondary-foreground/60 space-y-2">
          <p>© 2025 Real Estate on Purpose™. All rights reserved.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/privacy-policy" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-of-service" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/legal-disclaimer" className="hover:text-primary-foreground transition-colors">
              Legal Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SoftClose;