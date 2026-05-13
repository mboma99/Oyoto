"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 100,
  className = "",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
  }, [text]);

  // Handle typing animation
  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => text.slice(0, prev.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text, speed]);

  return (
    <h1 className={className}>
      {displayedText}
      {!isComplete && (
        <span className="typewriter-cursor" style={{ marginLeft: "0.1em" }}>
          |
        </span>
      )}
    </h1>
  );
}


