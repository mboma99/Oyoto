"use client";

import { useState, useEffect } from "react";

interface DecipherTextProps {
  text: string;
  speed?: number;
  className?: string;
  animateOnHover?: boolean;
  startScrambled?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function DecipherText({
  text,
  speed = 70,
  className = "",
  animateOnHover = false,
  startScrambled = false,
}: DecipherTextProps) {
  // Use the original text for initial render to avoid hydration mismatch
  const [displayedText, setDisplayedText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // On mount, if we should start scrambled, set the initial random string
    if (startScrambled) {
      setDisplayedText(
        text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
      );
    } else if (!animateOnHover) {
      // Start initial decipher animation if not waiting for hover
      setIsAnimating(true);
    }
  }, [text, startScrambled, animateOnHover]);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
  };

  useEffect(() => {
    if (!isAnimating) return;

    let iterations = 0;
    const maxIterations = text.length * 2;

    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        prev
          .split("")
          .map((_, index) => {
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
        setIsAnimating(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isAnimating]);

  return (
    <span 
      className={className} 
      onMouseEnter={startScrambled || animateOnHover ? startAnimation : undefined}
      style={{ position: "relative", display: "inline-block" }}
    >
      <span style={{ visibility: "hidden" }}>{text}</span>
      <span style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}>
        {displayedText}
      </span>
    </span>
  );
}