"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Asymmetric editorial layout, cycled by position in the grid so new projects
 * slot into the rhythm without touching this file.
 */
const layoutCycle = [
  { span: 7, ratio: "16 / 10", wide: true },
  { span: 5, ratio: "4 / 5", offset: true },
  { span: 4, ratio: "4 / 5" },
  { span: 8, ratio: "16 / 9", wide: true },
  { span: 12, ratio: "21 / 9", wide: true },
  { span: 6, ratio: "1 / 1" },
  { span: 6, ratio: "1 / 1", offset: true },
];

const ALL = "All Work";
const filters = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const visible =
    activeFilter === ALL
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealActive);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <div className={styles.page}>
      <SiteHeader tagline="Project Archive" />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          Curated Works
        </p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}><span>ARCHIVE</span></span>
          <span className={styles.heroLine}>
            <span className={styles.heroOutline}>STUDIO</span>
          </span>
        </h1>
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${styles.pill} ${activeFilter === filter ? styles.pillActive : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid} ref={gridRef}>
          {visible.map((project, i) => {
            const slot = layoutCycle[i % layoutCycle.length];
            const num = String(projects.indexOf(project) + 1).padStart(2, "0");

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`${styles.card} ${styles.reveal} ${slot.offset ? styles.cardOffset : ""}`}
                style={
                  {
                    "--span": slot.span,
                    "--ratio": slot.ratio,
                  } as React.CSSProperties
                }
              >
                <div className={styles.cardFrame}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={`(max-width: 768px) 100vw, ${Math.round((slot.span / 12) * 100)}vw`}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardOverlay}>
                    <p className={styles.cardCategory}>{project.category}</p>
                    <h2 className={styles.cardTitle}>{project.title}</h2>
                  </div>
                </div>
                <div className={styles.cardMeta}>
                  <span>{num} / {project.category}</span>
                  {slot.wide && (
                    <>
                      <span className={styles.metaRule} aria-hidden="true" />
                      <span>{project.year}</span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
