"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./SiteHeader.module.css";

/**
 * Fixed in-page header for the marketing pages. Sits beside the fixed side rail
 * rendered by Navigation, and hides on mobile where Navigation's top bar takes over.
 */
export function SiteHeader({ tagline = "Digital Studio" }: { tagline?: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (fillRef.current) {
      fillRef.current.style.left = `${x}px`;
      fillRef.current.style.top = `${y}px`;
      fillRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (fillRef.current) {
      fillRef.current.style.left = `${x}px`;
      fillRef.current.style.top = `${y}px`;
      fillRef.current.style.transform = "translate(-50%, -50%) scale(0)";
    }
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerLeft}>
        <Link href="/" className={styles.logo}>oyotō</Link>
        <span className={styles.statusPill}>
          <span className={styles.dot} aria-hidden="true" />
          {tagline}
        </span>
      </div>
      <nav className={styles.headerNav}>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link
          href="/contact"
          className={styles.contactPill}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span ref={fillRef} className={styles.pillFill} aria-hidden="true" />
          <span className={styles.pillText}>Contact</span>
        </Link>
      </nav>
    </header>
  );
}
