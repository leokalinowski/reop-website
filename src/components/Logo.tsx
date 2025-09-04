import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon */}
      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-foreground"
        >
          <path 
            d="M12 3L2 12H5V20H19V12H22L12 3Z" 
            fill="currentColor"
          />
          <rect x="9" y="14" width="2" height="4" fill="white" opacity="0.8"/>
          <rect x="13" y="14" width="2" height="4" fill="white" opacity="0.8"/>
        </svg>
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