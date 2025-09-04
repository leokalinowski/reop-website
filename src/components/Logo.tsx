import React, { useRef, useEffect } from 'react';

interface LogoProps {
  onPositionChange?: (position: { x: number; y: number }) => void;
}

const Logo = ({ onPositionChange }: LogoProps) => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (logoRef.current && onPositionChange) {
        const rect = logoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        onPositionChange({ x: centerX, y: centerY });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [onPositionChange]);

  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <div ref={logoRef} className="h-16 w-auto flex items-center justify-center">
        <img 
          src="/images/reop-logo-full.png" 
          alt="Real Estate on Purpose Logo"
          className="h-16 w-auto object-contain"
          loading="eager"
        />
      </div>
      
    </div>
  );
};

export default Logo;