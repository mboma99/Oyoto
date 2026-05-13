"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";
import { TypewriterText } from "@/components/TypewriterText";

const ModelScene = dynamic(() => import("@/components/ModelScene"), {
  ssr: false,
});
const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    subtitle: "Web Platform",
    description: "A modern full-stack product with smooth UX and clean architecture.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    title: "Project Two",
    subtitle: "Mobile Experience",
    description: "Cross-platform mobile app focused on usability and performance.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    title: "Project Three",
    subtitle: "Data Visualization",
    description: "Analytics dashboard turning complex data into clear insights.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <aside className={styles.sideNav}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <DecipherText text={menuOpen ? "CLOSE" : "MENU"} />
        </button>
      </aside>

      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.logo}>oyotō</p>
          <nav className={styles.nav}>
            <a href="#about">ABOUT</a>
            <a href="#projects">PROJECTS</a>
          </nav>
        </header>

        <main>
          <section className={styles.hero} id="about">
            <div className={styles.modelWrap}>
              <ModelScene modelPath="/models/abstract_shape.glb" />
            </div>
            <div className={styles.heroTextWrap}>
              <TypewriterText
                text="DEFINE YOUR FUTURE."
                speed={150}
                className={styles.heroTitle}
              />
            </div>
          </section>

          <section className={styles.projectSection} id="projects">
            <div className={styles.sliderTrack}>
              {projects.map((project) => (
                <article key={project.id} className={styles.projectCard}>
                  <div className={styles.projectContent}>
                    <p className={styles.projectSubtitle}>{project.subtitle}</p>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                  </div>
                  <div className={styles.projectImageWrap}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 980px) 100vw, 30vw"
                      priority={project.id === 1}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div>
            Oyotō © 2026
          </div>
          <div>
            <a href="https://github.com/mboma99" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/james-mboma/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
          </div>
        </footer>
      </div>

      {/* Full Page Menu Overlay */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`}>
        <p className={styles.logo}>oyotō</p>
        <div className={styles.menuContent}>
          <nav className={styles.menuNav}>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              ABOUT
            </a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>
              PROJECTS
            </a>
            <a href="mailto:jamesmboma08@gmail.com">CONTACT</a>
            <a href="#resume" onClick={() => setMenuOpen(false)}>
              RESUME
            </a>
          </nav>
        </div>
        <div className={styles.menuFooter}>
          <div className={styles.menuFooterLeft}>
            Oyotō © 2026
          </div>
          <div className={styles.menuFooterRight}>
            <a href="https://github.com/mboma99" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/james-mboma/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
