import Link from "next/link";
import styles from "./SiteHeader.module.css";
import { contactMailto } from "@/lib/seo";

/**
 * Fixed in-page header for the marketing pages. Sits beside the fixed side rail
 * rendered by Navigation, and hides on mobile where Navigation's top bar takes over.
 */
export function SiteHeader({ tagline = "Digital Studio" }: { tagline?: string }) {
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
        <a href={contactMailto}>Contact</a>
      </nav>
    </header>
  );
}
