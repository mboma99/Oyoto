"use client";

import { useEffect, useState } from "react";
import { DecipherText } from "./DecipherText";

interface HeroTypewriterTextProps {
  className?: string;
  speed?: number;
  intervalMs?: number;
}

const prefix = "DEFINE YOUR";
const words = ["FUTURE", "IMPACT", "PRESENCE", "BRAND"];
const fullText = `${prefix} ${words[0]}`;

export function HeroTypewriterText({
  className = "",
  speed = 100,
  intervalMs = 4000,
}: HeroTypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    }

    setIsComplete(true);
  }, [displayedText, speed]);

  useEffect(() => {
    if (!isComplete) return;

    const timer = setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, isComplete]);

  if (!isComplete) {
    return (
      <h1 className={className}>
        {displayedText}
        <span className="typewriter-cursor" style={{ marginLeft: "0.1em" }}>
          |
        </span>
      </h1>
    );
  }

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
