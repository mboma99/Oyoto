"use client";

import { useState, useEffect } from "react";

interface CyclingTypewriterTextProps {
  prefix: string;
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export function CyclingTypewriterText({
  prefix,
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
}: CyclingTypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);

      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, deleteSpeed);

        return () => clearTimeout(deleteTimer);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayedText.length < currentWord.length) {
        const typeTimer = setTimeout(() => {
          setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
        }, typeSpeed);

        return () => clearTimeout(typeTimer);
      } else {
        setIsPaused(true);
      }
    }
  }, [displayedText, currentWordIndex, isDeleting, isPaused, words, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <h1 className={className}>
      {prefix} {displayedText}
      <span className="typewriter-cursor" style={{ marginLeft: "0.1em" }}>
        |
      </span>
    </h1>
  );
}
