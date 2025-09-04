import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ContainerTextFlipProps {
  words: string[];
  interval?: number;
  animationDuration?: number;
  className?: string;
}

export const ContainerTextFlip: React.FC<ContainerTextFlipProps> = ({
  words,
  interval = 2000,
  animationDuration = 500,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, animationDuration / 2);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, animationDuration]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span
        className={cn(
          "transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-lg inline-block mx-2",
          isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
        )}
        style={{
          transitionDuration: `${animationDuration}ms`,
          backgroundColor: '#005d6c'
        }}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};