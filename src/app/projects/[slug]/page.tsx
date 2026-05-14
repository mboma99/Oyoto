"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CursorParticles } from "@/components/CursorParticles";
import { Footer } from "@/components/Footer";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.layout}>
      <CursorParticles />
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/projects" className={styles.backBtn}>
            ← [ BACK TO PROJECTS ]
          </Link>
          <Link href="/" className={styles.logo} style={{
            fontFamily: "Space Mono, monospace",
            fontWeight: 700,
            letterSpacing: "0.5em",
            textTransform: "lowercase",
            textDecoration: "none",
            color: "white",
            fontSize: "1.5rem"
          }}>oyotō</Link>
        </header>

        <main>
          <section className={styles.hero}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={styles.heroImage}
              priority
            />
            <div className={styles.heroOverlay}>
              <h1 className={styles.title}>
                <DecipherText text={project.title} />
              </h1>
            </div>
          </section>

          <section className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Client</span>
              <span className={styles.metaValue}>{project.client}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Role</span>
              <span className={styles.metaValue}>{project.role}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Year</span>
              <span className={styles.metaValue}>{project.year}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Services</span>
              <span className={styles.metaValue}>{project.tags.join(", ")}</span>
            </div>
          </section>

          <div className={styles.caseStudyGrid}>
            <aside className={styles.sidebar}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Tech Stack</h2>
                <div className={styles.techList}>
                  {project.caseStudy.techStack.map((tech) => (
                    <div key={tech} className={styles.techItem}>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.sectionBody}>{project.caseStudy.overview}</p>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>The Challenge</h2>
                <p className={styles.sectionBody}>{project.caseStudy.challenge}</p>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>The Solution</h2>
                <p className={styles.sectionBody}>{project.caseStudy.solution}</p>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Outcome</h2>
                <p className={styles.sectionBody}>{project.caseStudy.outcome}</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
