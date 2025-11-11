import { Linkedin, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Agent Systems Starter Pack", href: "#starter-pack" },
    { label: "DIY Access", href: "#diy" },
    { label: "Supported Agent Model", href: "#supported" },
    { label: "Blog / Market Insights", href: "#blog" },
    { label: "About REOP", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Tagline */}
        <div className="text-center mb-12">
          <p className="text-xl italic">
            "Your Command Center for a Profitable, Joyful Real Estate Business."
          </p>
        </div>
        
        {/* Quick Links Grid (2×3) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-center md:text-left"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            href="mailto:contact@realestateonpurpose.com"
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-primary-foreground/70">
          © 2025 Real Estate on Purpose™. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
