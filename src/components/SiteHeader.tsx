"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, CaretDown, List, X } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { services } from "@/data/services";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
];

/** How long the services panel waits before closing once the pointer leaves,
    so a diagonal move from the button into the panel doesn't drop it. */
const CLOSE_DELAY = 160;

/**
 * "Services" in the desktop nav: a button that opens a panel listing each
 * service by name, plus the overview page. Opens on hover (mouse)
 * or click/Enter; closes on Escape, a click elsewhere, focus leaving, or a
 * route change.
 */
function ServicesMenu({ active }: { active: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // A mouse hovers before it clicks: the click that follows a hover-open
  // should keep the panel open, not toggle it shut.
  const openedByHover = useRef(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const show = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) openedByHover.current = true;
    setOpen(true);
  };
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      openedByHover.current = false;
      setOpen(false);
    }, CLOSE_DELAY);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={styles.dropdown}
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.navLink} ${styles.navButton}`}
        aria-expanded={open}
        aria-controls="services-menu"
        aria-current={active ? "page" : undefined}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
          } else {
            setOpen((v) => !v);
          }
        }}
      >
        Services
        <CaretDown className={styles.caret} size={12} weight="bold" aria-hidden="true" />
      </button>

      <div id="services-menu" className={styles.panel} data-open={open} inert={!open}>
        <ul className={styles.panelList}>
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className={styles.panelItem}
                aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/services" className={styles.panelAll} onClick={() => setOpen(false)}>
          All services <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

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
        Oyotō
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        {links.map((link) =>
          link.href === "/services" ? (
            <ServicesMenu key={link.href} active={isActive(link.href)} />
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          )
        )}
      </nav>

      <div className={styles.actions}>
        <ThemeToggle className={styles.iconButton} />

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
          className={`${styles.iconButton} ${styles.menuToggle}`}
          aria-expanded={open}
          aria-controls="site-index"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
        </button>
      </div>

      <div
        id="site-index"
        className={`${styles.index} ${open ? styles.indexOpen : ""}`}
        inert={!open}
      >
        <nav aria-label="Site index" className={styles.indexNav}>
          {[...links, { href: "/contact", label: "Contact" }].map((link, i) => (
            <div key={link.href}>
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                className={styles.indexLink}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
              {link.href === "/services" && (
                <ul className={styles.indexSub} style={{ "--i": i } as React.CSSProperties}>
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className={styles.indexSubLink}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === `/services/${service.slug}` ? "page" : undefined}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
