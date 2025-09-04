import React, { useEffect, useRef, useState } from 'react';

interface LightRaysProps {
  raysOrigin?: 'top-center' | 'center' | 'bottom-center' | 'top-left' | 'top-right' | 'custom';
  customOrigin?: { x: number; y: number };
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = 'top-center',
  customOrigin,
  raysColor = '#00ffff',
  raysSpeed = 1.5,
  lightSpread = 0.8,
  rayLength = 1.2,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.1,
  distortion = 0.05,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const parent = canvasRef.current.parentElement;
        setDimensions({
          width: parent.clientWidth,
          height: parent.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const rays: Array<{
      angle: number;
      baseAngle: number;
      length: number;
      opacity: number;
      phase: number;
    }> = [];

    // Initialize rays
    const numRays = Math.floor(30 * lightSpread);
    for (let i = 0; i < numRays; i++) {
      const baseAngle = (i / numRays) * Math.PI * 2 * lightSpread - (Math.PI * lightSpread);
      rays.push({
        angle: baseAngle,
        baseAngle,
        length: (Math.random() * 0.5 + 0.5) * rayLength,
        opacity: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Get origin point
    const getOriginPoint = () => {
      if (raysOrigin === 'custom' && customOrigin) {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const base = {
            x: customOrigin.x - rect.left,
            y: customOrigin.y - rect.top
          };
          
          if (followMouse) {
            const mouseInfluenceX = (mouseRef.current.x - base.x) * mouseInfluence;
            const mouseInfluenceY = (mouseRef.current.y - base.y) * mouseInfluence;
            return {
              x: base.x + mouseInfluenceX,
              y: base.y + mouseInfluenceY
            };
          }
          
          return base;
        }
      }

      const baseOrigins = {
        'top-center': { x: dimensions.width / 2, y: 0 },
        'center': { x: dimensions.width / 2, y: dimensions.height / 2 },
        'bottom-center': { x: dimensions.width / 2, y: dimensions.height },
        'top-left': { x: 0, y: 0 },
        'top-right': { x: dimensions.width, y: 0 }
      };

      const base = baseOrigins[raysOrigin as keyof typeof baseOrigins] || baseOrigins['top-center'];
      
      if (followMouse) {
        const mouseInfluenceX = (mouseRef.current.x - base.x) * mouseInfluence;
        const mouseInfluenceY = (mouseRef.current.y - base.y) * mouseInfluence;
        return {
          x: base.x + mouseInfluenceX,
          y: base.y + mouseInfluenceY
        };
      }
      
      return base;
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const origin = getOriginPoint();
      time += 0.01 * raysSpeed;

      rays.forEach((ray, index) => {
        // Add noise and distortion
        const noise = Math.sin(time + ray.phase) * noiseAmount;
        const distortionOffset = Math.sin(time * 2 + index) * distortion;
        
        ray.angle = ray.baseAngle + noise + distortionOffset;
        
        // Calculate end point
        const length = Math.min(dimensions.width, dimensions.height) * ray.length;
        const endX = origin.x + Math.cos(ray.angle) * length;
        const endY = origin.y + Math.sin(ray.angle) * length;

        // Create gradient
        const gradient = ctx.createLinearGradient(origin.x, origin.y, endX, endY);
        gradient.addColorStop(0, `${raysColor}${Math.floor(ray.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.7, `${raysColor}${Math.floor(ray.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        // Draw ray
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Animate opacity
        ray.opacity = Math.abs(Math.sin(time + ray.phase)) * 0.4 + 0.1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, raysOrigin, customOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [followMouse]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LightRays;