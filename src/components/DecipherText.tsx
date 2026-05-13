"use client";

import { useState, useEffect } from "react";

interface DecipherTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function DecipherText({
  text,
  speed = 90,
  className = "",
}: DecipherTextProps) {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
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
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayedText}</span>;
}
