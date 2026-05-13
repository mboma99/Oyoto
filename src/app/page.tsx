"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { TypewriterText } from "@/components/TypewriterText";

const ModelScene = dynamic(() => import("@/components/ModelScene"), {
  ssr: false,
});
const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [brandTextVisible, setBrandTextVisible] = useState(false);
  const [brandAnimVisible, setBrandAnimVisible] = useState(false);
  const projectSectionRef = useRef<HTMLElement | null>(null);
  const brandSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = projectSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVideoVisible(true);
        observer.disconnect();
      },
      { threshold: 0.62 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateBrandVisibility = () => {
      const section = brandSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const textShouldShow =
        rect.top < viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.2;
      const animShouldShow =
        rect.top < viewportHeight * 0.32 && rect.bottom > viewportHeight * 0.12;

      setBrandTextVisible(textShouldShow);
      setBrandAnimVisible(animShouldShow);
    };

    updateBrandVisibility();
    window.addEventListener("scroll", updateBrandVisibility, { passive: true });
    window.addEventListener("resize", updateBrandVisibility);

    return () => {
      window.removeEventListener("scroll", updateBrandVisibility);
      window.removeEventListener("resize", updateBrandVisibility);
    };
  }, []);

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

          <section className={styles.projectSection} id="projects" ref={projectSectionRef}>
            <article className={`${styles.projectCard} ${videoVisible ? styles.projectCardVisible : ""}`}>
              <div className={styles.projectImageWrap}>
                <video
                  className={styles.projectVideo}
                  src="/projects/Project-Showcase.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                />
              </div>
            </article>
          </section>

          <section className={styles.brandSection} id="brand-ai" ref={brandSectionRef}>
            <div className={styles.brandInner}>
              <div className={`${styles.brandTextCol} ${brandTextVisible ? styles.brandTextVisible : ""}`}>
                <p className={styles.brandEyebrow}>DIGITAL BRAND + AI</p>
                <h2 className={styles.brandTitle}>
                  Build a digital brand that compounds and an AI workflow that scales.
                </h2>
                <p className={styles.brandBody}>
                  I help businesses craft unmistakable digital presence across product,
                  content, and customer touchpoints, then layer practical AI systems
                  that automate repetitive work, sharpen decision making, and unlock
                  faster growth.
                </p>
              </div>
              <div className={`${styles.brandAnimCol} ${brandAnimVisible ? styles.brandAnimVisible : ""}`} aria-hidden="true">
                <div className={styles.orbitWrap}>
                  <span className={`${styles.ring} ${styles.ringOne}`} />
                  <span className={`${styles.ring} ${styles.ringTwo}`} />
                  <span className={`${styles.ring} ${styles.ringThree}`} />
                  <span className={styles.pulseCore} />
                </div>
              </div>
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
