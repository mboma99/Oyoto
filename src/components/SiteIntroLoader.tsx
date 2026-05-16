"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import styles from "./SiteIntroLoader.module.css";

const letters = ["o", "y", "o", "t", "ō"];
const minimumDuration = 1000;

export function SiteIntroLoader() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!shouldRender) return;

    const timer = window.setTimeout(() => {
      setIsLeaving(true);
    }, minimumDuration);

    return () => window.clearTimeout(timer);
  }, [shouldRender]);

  useEffect(() => {
    if (!isLeaving) return;

    const timer = window.setTimeout(() => {
      setShouldRender(false);
    }, 520);

    return () => window.clearTimeout(timer);
  }, [isLeaving]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${isLeaving ? styles.hidden : ""}`}
      aria-label="Loading Oyoto"
      role="status"
    >
      <div className={styles.mark}>
        {letters.map((letter, index) => (
          <span
            className={styles.letter}
            key={`${letter}-${index}`}
            style={{ "--letter-index": index } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
