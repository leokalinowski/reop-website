import React, { useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ContainerTextFlipProps {
  words: string[];
  interval?: number;
  animationDuration?: number;
  className?: string;
}

export const ContainerTextFlip: React.FC<ContainerTextFlipProps> = React.memo(({
  words,
  interval = 2000,
  animationDuration = 500,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateIndex = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
      setIsAnimating(false);
    }, animationDuration / 2);
  }, [words.length, animationDuration]);

  useEffect(() => {
    if (words.length <= 1) return;
    
    const timer = setInterval(updateIndex, interval);
    return () => clearInterval(timer);
  }, [interval, updateIndex, words.length]);

  const containerStyle = useMemo(() => ({
    transitionDuration: `${animationDuration}ms`,
    backgroundColor: 'hsl(var(--accent))',
    minWidth: '200px', // Prevent layout shifts
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }), [animationDuration]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span
        className={cn(
          "transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-lg inline-flex items-center justify-center mx-2",
          isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
        )}
        style={containerStyle}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
});