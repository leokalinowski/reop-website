import React from 'react';
import logoImage from '@/assets/logos/reop-logo-full.png';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <div className="h-16 w-auto flex items-center justify-center">
        <img 
          src={logoImage} 
          alt="Real Estate on Purpose Logo"
          className="h-16 w-auto object-contain"
          loading="eager"
        />
      </div>
      
    </div>
  );
};

export default Logo;