import React from 'react';
import logoImage from '@/assets/logo.svg';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <div className="h-10 w-auto">
        <img 
          src={logoImage} 
          alt="Real Estate ON PURPOSE Logo" 
          className="h-full w-auto object-contain"
        />
      </div>
      
      {/* Company Name - Hidden on mobile for cleaner look */}
      <div className="hidden sm:flex flex-col">
        <span className="text-xl font-semibold text-foreground tracking-tight">
          Real Estate <span className="text-primary font-bold">ON PURPOSE</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;