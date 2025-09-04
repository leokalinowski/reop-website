import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowingEffectProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  blur?: number;
  spread?: number;
  borderWidth?: number;
  disabled?: boolean;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  children,
  className,
  containerClassName,
  blur = 15,
  spread = 60,
  borderWidth = 1,
  disabled = false
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled || !divRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = divRef.current!.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const element = divRef.current;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  return (
    <div
      ref={divRef}
      className={cn(
        'relative overflow-hidden rounded-xl',
        containerClassName
      )}
    >
      {/* Glowing border effect */}
      {!disabled && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500',
            isHovered && 'opacity-100'
          )}
          style={{
            background: isHovered
              ? `radial-gradient(${spread}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(0, 162, 173, 0.4) 0%, 
                  rgba(0, 93, 108, 0.3) 20%,
                  rgba(153, 202, 60, 0.2) 40%,
                  transparent 70%)`
              : 'none',
            filter: `blur(${blur}px)`,
          }}
        />
      )}
      
      {/* Border */}
      {!disabled && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500',
            isHovered && 'opacity-100'
          )}
          style={{
            background: isHovered
              ? `radial-gradient(${spread * 1.5}px circle at ${mousePosition.x}px ${mousePosition.y}px, 
                  rgba(0, 162, 173, 0.8) 0%, 
                  rgba(0, 93, 108, 0.6) 25%,
                  rgba(153, 202, 60, 0.4) 50%,
                  transparent 70%)`
              : 'none',
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: `${borderWidth}px`,
          }}
        />
      )}
      
      {/* Content */}
      <div className={cn('relative z-10', className)}>
        {children}
      </div>
    </div>
  );
};