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
            <h3>JAMES MBOMA</h3>
            <p>A dedicated software engineer, looking to solve real problems.</p>
          </div>
          <div>
            <h3>LETS CHAT</h3>
            <p>jamesmboma08@gmail.com</p>
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
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              CONTACT
            </a>
            <a href="mailto:jamesmboma08@gmail.com">EMAIL</a>
            <a href="#learn-more" onClick={() => setMenuOpen(false)}>
              LEARN MORE
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
