"use client";

import { useState, useEffect } from "react";

interface DecipherTextProps {
  text: string;
  speed?: number;
  className?: string;
  animateOnHover?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function DecipherText({
  text,
  speed = 70,
  className = "",
  animateOnHover = false,
}: DecipherTextProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(!animateOnHover);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
  };

  useEffect(() => {
    if (!isAnimating) return;

    let iterations = 0;
    const maxIterations = text.length * 2; // Adjust for scramble duration

    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (iterations >= maxIterations - text.length + index) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterations += 1;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayedText(text);
        if (animateOnHover) setIsAnimating(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isAnimating, animateOnHover]);

  return (
    <span 
      className={className} 
      onMouseEnter={animateOnHover ? startAnimation : undefined}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Invisible original text to reserve exact space */}
      <span style={{ visibility: "hidden" }}>{text}</span>
      {/* Absolute text for the scrambling animation */}
      <span style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}>
        {displayedText}
      </span>
    </span>
  );
}