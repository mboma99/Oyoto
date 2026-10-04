"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
];

const socials = [
  { href: "https://www.linkedin.com/in/james-mboma/", label: "LinkedIn" },
];

/**
 * The one header for every route. It lives in the root layout and carries the
 * `site-header` view-transition name, so route changes turn the page beneath it
 * while it stays put. Below 768px the links collapse into a full-screen index.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Close the index whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={styles.header} style={{ viewTransitionName: "site-header" }}>
      <Link href="/" className={styles.logo} aria-label="Oyotō home">
        <Logo />
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.navLink}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        className={styles.cta}
        aria-current={isActive("/contact") ? "page" : undefined}
      >
        Contact
      </Link>

      <button
        ref={toggleRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls="site-index"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
      </button>

      <div
        id="site-index"
        className={`${styles.index} ${open ? styles.indexOpen : ""}`}
        inert={!open}
      >
        <nav aria-label="Site index" className={styles.indexNav}>
          {[...links, { href: "/contact", label: "Contact" }].map((link, i) => (
            <Link
              key={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={link.href}
              className={styles.indexLink}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.indexFoot}>
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
