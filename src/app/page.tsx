"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { TypewriterText } from "@/components/TypewriterText";
import { HeroAnimation } from "@/components/HeroAnimation";

const ModelScene = dynamic(() => import("@/components/ModelScene"), {
  ssr: false,
});
const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

export default function Home() {
  const [brandTextVisible, setBrandTextVisible] = useState(false);
  const [brandAnimVisible, setBrandAnimVisible] = useState(false);
  const brandSectionRef = useRef<HTMLElement | null>(null);

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
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.logo}>oyotō</p>
          <nav className={styles.nav}>
            <Link href="/about"><DecipherText text={"ABOUT"} animateOnHover={true} /></Link>
            <Link href="/#projects"><DecipherText text={"PROJECTS"} animateOnHover={true} /></Link>
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
            <HeroAnimation />
          </section>

          <section className={styles.brandSection} id="brand-ai" ref={brandSectionRef}>
            <div className={styles.brandInner}>
              <div className={`${styles.brandTextCol} ${brandTextVisible ? styles.brandTextVisible : ""}`}>
                <p className={styles.brandEyebrow}>DIGITAL BRAND</p>
                <h2 className={styles.brandTitle}>
                  Build a Presence That Matters.
                </h2>
                <p className={styles.brandBody}>
                  We help businesses bridge the gap between brand vision and engineering reality.
                  We build robust software across product and content systems,
                  turning technical reliability into your greatest brand asset.
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
    </div>
  );
}
