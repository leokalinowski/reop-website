import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import logoCompact from "@/assets/logos/reop-logo-compact.png";

const ResourceLandingFooter = () => {
  return (
    <footer className="w-full py-8 px-6 bg-muted/30 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" aria-label="Real Estate On Purpose - Home">
            <img src={logoCompact} alt="Real Estate On Purpose" className="h-8 w-auto" />
          </Link>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="tel:+15127179063" 
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              (512) 717-9063
            </a>
            <a 
              href="mailto:info@realestateonpurpose.com" 
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              info@realestateonpurpose.com
            </a>
          </div>
        </div>

        {/* Legal Links & Copyright */}
        <div className="mt-6 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="text-border">|</span>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <span className="text-border">|</span>
            <Link to="/legal-disclaimer" className="hover:text-foreground transition-colors">
              Legal Disclaimer
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Real Estate On Purpose. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ResourceLandingFooter;
