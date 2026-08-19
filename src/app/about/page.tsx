"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SkillPit } from "@/components/SkillPit";
import { contactEmail, contactMailto } from "@/lib/seo";

const philosophy = [
  {
    title: "Intentionality",
    body: "Every pixel, every line of code, and every interaction must serve a specific purpose within the ecosystem.",
  },
  {
    title: "Performance",
    body: "Speed and stability are the foundations of luxury. We engineer for zero friction.",
  },
  {
    title: "Longevity",
    body: "We build systems that don't just solve today's problems but anticipate the shifts of tomorrow.",
  },
];

const expertise = [
  {
    title: "Full-stack development",
    body: "React and Next.js front ends over FastAPI and Node services, backed by PostgreSQL.",
  },
  {
    title: "Cloud architecture",
    body: "GCP and AWS infrastructure, Nginx, and Redis, built to hold up under launch-day load.",
  },
  {
    title: "UI/UX engineering",
    body: "Design systems, motion, and interface work carried from concept through to shipped code.",
  },
  {
    title: "AI integration",
    body: "Multi-model classification and language features wired into live product data.",
  },
  {
    title: "Mobile apps",
    body: "Flutter applications delivered to iOS against the same services as the web.",
  },
  {
    title: "Business intelligence",
    body: "Analytics, reporting, and the data plumbing that makes the numbers trustworthy.",
  },
  {
    title: "Technical consulting",
    body: "Architecture review, platform selection, and a second opinion before the build starts.",
  },
];

export default function About() {
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

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

    root.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page} ref={mainRef}>
      <SiteHeader tagline="Studio Profile" />

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow} data-physics-obstacle="true">
            <span className={styles.dot} aria-hidden="true" />
            Aesthetic Restraint
          </p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine}>
              <span data-physics-obstacle="true">CRAFTING</span>
            </span>
            <span className={styles.heroLine}>
              <span className={styles.heroOutline} data-physics-obstacle="true">
                CONTEXT
              </span>
            </span>
          </h1>
        </div>
        <SkillPit />
      </header>

      <main>
        <section className={styles.intro}>
          <div className={`${styles.introFrame} ${styles.reveal}`}>
            <Image
              src="/hero-images/well-church.png"
              alt="The Well Church — a congregation mid-service"
              fill
              sizes="(max-width: 768px) 100vw, 38vw"
              className={styles.introImage}
            />
          </div>
          <div className={`${styles.introText} ${styles.reveal}`}>
            <p className={styles.introLead}>
              Oyoto is a multifaceted{" "}
              <span className={styles.introDim}>digital product development</span>{" "}
              firm, founded to expand our clients&apos; presence in the digital space.
            </p>
            <span className={styles.introRule} aria-hidden="true" />
            <p className={styles.introMeta}>
              Founded by James Mboma in 2019. Certain projects may remain under NDA
              until release.
            </p>
          </div>
        </section>

        <section className={styles.philosophy}>
          <span className={`${styles.sectionLabel} ${styles.reveal}`}>Philosophy</span>
          <div className={styles.philosophyGrid}>
            {philosophy.map((item) => (
              <div key={item.title} className={styles.reveal}>
                <h2 className={styles.philosophyTitle}>{item.title}</h2>
                <p className={styles.philosophyBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.expertise} id="expertise">
          <h2 className={`${styles.expertiseHeading} ${styles.reveal}`}>Expertise</h2>
          <div className={styles.expertiseList}>
            {expertise.map((item, i) => (
              <div key={item.title} className={`${styles.row} ${styles.reveal}`}>
                <div className={styles.rowLeft}>
                  <span className={styles.rowNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.rowTitle}>{item.title}</h3>
                </div>
                <p className={styles.rowBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.connect}>
          <span className={`${styles.sectionLabel} ${styles.reveal}`}>Connect</span>
          <a href={contactMailto} className={`${styles.email} ${styles.reveal}`}>
            {contactEmail}
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
