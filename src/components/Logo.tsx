
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Real Estate Logo Icon */}
      <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
          <path d="M9 9h.01M9 12h.01M9 15h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
        </svg>
      </div>
      
      {/* Company Name */}
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-foreground tracking-tight">
          Real Estate on Purpose
        </span>
      </div>
    </div>
  );
};

export default Logo;
