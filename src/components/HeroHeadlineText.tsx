"use client";

import { useEffect, useState } from "react";
import { DecipherText } from "./DecipherText";

interface HeroHeadlineTextProps {
  className?: string;
  intervalMs?: number;
}

const prefix = "DEFINE YOUR";
const words = ["FUTURE", "IMPACT", "PRESENCE", "BRAND"];

export function HeroHeadlineText({
  className = "",
  intervalMs = 4000,
}: HeroHeadlineTextProps) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <h1 className={className}>
      {prefix}{" "}
      <span className="hero-word-slot">
        <DecipherText
          text={words[wordIndex]}
          className="hero-decipher-word"
          animateOnMount={wordIndex !== 0}
        />
      </span>
    </h1>
  );
}
