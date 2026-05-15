"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./Navigation.module.css";

const DecipherText = dynamic(() => import("./DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop side nav — hidden on mobile */}
      <aside className={styles.sideNav}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <DecipherText key={menuOpen ? "CLOSE" : "MENU"} text={menuOpen ? "CLOSE" : "MENU"} />
        </button>
      </aside>

      {/* Mobile top bar — hidden on desktop */}
      <div className={styles.mobileTopBar}>
        <Link href="/" className={styles.mobileTopLogo}>oyotō</Link>
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineOpen1 : ""}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineOpen2 : ""}`} />
          <span className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineOpen3 : ""}`} />
        </button>
      </div>

      {/* Full-screen overlay menu */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.open : ""}`}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          oyotō
        </Link>
        <div className={styles.menuContent}>
          <nav className={styles.menuNav}>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              ABOUT
            </Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)}>
              PROJECTS
            </Link>
            <a href="mailto:oyotostudios@outlook.com" onClick={() => setMenuOpen(false)}>
              CONTACT
            </a>
            <Link href="/resume" onClick={() => setMenuOpen(false)}>
              RESUME
            </Link>
          </nav>
        </div>
        <div className={styles.menuFooter}>
          <div className={styles.menuFooterLeft}>Oyotō © 2026</div>
          <div className={styles.menuFooterRight}>
            <a
              href="https://github.com/mboma99"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/james-mboma/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
