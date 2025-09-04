import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <div className="h-10 w-auto flex items-center justify-center">
        <img 
          src="/images/reop-logo-full.png" 
          alt="Real Estate on Purpose Logo"
          className="h-10 w-auto object-contain"
          loading="eager"
        />
      </div>
      
      {/* Company Name - Hidden on mobile for cleaner look */}
      <div className="hidden sm:flex flex-col">
        <span className="text-xl font-semibold text-foreground tracking-tight">
          Real Estate <span className="text-primary font-bold">on Purpose</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;