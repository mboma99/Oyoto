"use client";

import { use, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
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

// Custom component to handle scroll-direction based animation
function AnimatedSection({ children, className, delay = 0.2, amount = 0.3 }: { children: React.ReactNode, className?: string, delay?: number, amount?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount, margin: "0px 0px -100px 0px" });
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) { // Threshold to avoid noise
        setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
        lastScrollY.current = currentScrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.8, 
        // Only apply delay if we are scrolling down AND the section is coming into view
        delay: (isInView && scrollDirection === "down") ? delay : 0,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
    >
      {children}
    </motion.div>
  );
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
          <Link href="/" className={styles.logo}>oyotō</Link>
        </header>

        <main>
          <AnimatedSection className={styles.hero} amount={0.1}>
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
          </AnimatedSection>

          <AnimatedSection className={styles.metaGrid}>
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
          </AnimatedSection>

          <div className={styles.caseStudyGrid}>
            <aside className={styles.sidebar}>
              <AnimatedSection className={styles.section}>
                <h2 className={styles.sectionTitle}>Tech Stack</h2>
                <div className={styles.techList}>
                  {project.caseStudy.techStack.map((tech) => (
                    <div key={tech} className={styles.techItem}>
                      {tech}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </aside>

            <div className={styles.mainContent}>
              <AnimatedSection className={styles.section}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.sectionBody}>{project.caseStudy.overview}</p>
              </AnimatedSection>

              <AnimatedSection className={styles.section}>
                <h2 className={styles.sectionTitle}>The Challenge</h2>
                <p className={styles.sectionBody}>{project.caseStudy.challenge}</p>
              </AnimatedSection>

              <AnimatedSection className={styles.section}>
                <h2 className={styles.sectionTitle}>The Solution</h2>
                <p className={styles.sectionBody}>{project.caseStudy.solution}</p>
              </AnimatedSection>

              <AnimatedSection className={styles.section}>
                <h2 className={styles.sectionTitle}>Outcome</h2>
                <p className={styles.sectionBody}>{project.caseStudy.outcome}</p>
              </AnimatedSection>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
