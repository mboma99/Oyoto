import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { contactMailto } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <p className={styles.footerMark}>OYOTŌ</p>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Navigation</span>
            <Link href="/">Home</Link>
            <Link href="/about">Studio</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/resume">Resume</Link>
          </div>
          <div className={styles.footerCol}>
            <span className={styles.footerColTitle}>Elsewhere</span>
            <Link href="/contact">Contact</Link>
            <a
              href="https://github.com/mboma99"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/james-mboma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBase}>
        <span>© 2026 Oyotō</span>
        <span>All rights reserved</span>
      </div>
    </footer>
  );
}
