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
      <aside className={styles.sideNav}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <DecipherText text={menuOpen ? "CLOSE" : "MENU"} />
        </button>
      </aside>

      <div className={`${styles.menuOverlay} ${menuOpen ? styles.open : ""}`}>
        <p className={styles.logo}>oyotō</p>
        <div className={styles.menuContent}>
          <nav className={styles.menuNav}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              HOME
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              ABOUT
            </Link>
            <Link href="/projects" onClick={() => setMenuOpen(false)}>
              PROJECTS
            </Link>
            <a href="mailto:oyotostudios@outlook.com">
              CONTACT
            </a>
            <Link href="/#resume" onClick={() => setMenuOpen(false)}>
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
