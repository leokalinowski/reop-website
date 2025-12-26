import { Link } from "react-router-dom";
import logoFull from "@/assets/logos/reop-logo-full.png";

const ResourceLandingHeader = () => {
  return (
    <header className="w-full py-4 px-6 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <Link to="/" className="flex items-center" aria-label="Real Estate On Purpose - Home">
          <img src={logoFull} alt="Real Estate On Purpose" className="h-10 md:h-12 w-auto" />
        </Link>
      </div>
    </header>
  );
};

export default ResourceLandingHeader;
