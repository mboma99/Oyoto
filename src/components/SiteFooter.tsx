import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { contactEmail, contactMailto } from "@/lib/seo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <LogoMark className={styles.mark} />
          <p className={styles.line}>
            Web, mobile and AI products, built to last.
          </p>
          <a href={contactMailto} className={styles.email}>
            {contactEmail}
          </a>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          <div className={styles.col}>
            <h2 className={styles.colTitle}>Pages</h2>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.col}>
            <h2 className={styles.colTitle}>Elsewhere</h2>
            <a
              href="https://www.linkedin.com/in/james-mboma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </div>

      <div className={styles.base}>
        <span>
          © 2026 Oyotō · <Link href="/privacy">Privacy</Link>
        </span>
        <span>London, United Kingdom</span>
      </div>
    </footer>
  );
}
