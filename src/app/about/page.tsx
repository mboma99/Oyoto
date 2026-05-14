"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./page.module.css";
import { CursorParticles } from "@/components/CursorParticles";
import { Footer } from "@/components/Footer";

const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

export default function About() {
  const services = [
    "FULL-STACK DEVELOPMENT",
    "CLOUD ARCHITECTURE",
    "UI/UX ENGINEERING",
    "AI INTEGRATION",
    "MOBILE APPS",
    "BUSINESS INTELLIGENCE",
    "TECHNICAL CONSULTING",
    "PERFORMANCE OPTIMIZATION"
  ];

  return (
    <div className={styles.layout}>
      <CursorParticles />
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>oyotō</Link>
          <nav className={styles.nav}>
            <Link href="/about"><DecipherText text={"ABOUT"} animateOnHover={true} /></Link>
            <Link href="/projects"><DecipherText text={"PROJECTS"} animateOnHover={true} /></Link>
          </nav>
        </header>

        <main className={styles.content}>
          <h2 className={styles.sectionTitle}>ABOUT US</h2>
          <p className={styles.tagline}>
            [ OYOTO IS A MULTIFACETED DIGITAL PRODUCT DEVELOPMENT FIRM founded with a desire to
            expand our clients presence in the digital space. ]
          </p>
          <p className={styles.subText}>
            [ CERTAIN PROJECTS MAY BE UNDER NDA UNTIL RELEASE* ]
          </p>
          <p className={styles.founder}>
            [ FOUNDED BY JAMES MBOMA IN 2019 ]
          </p>

          <h3 className={styles.sectionTitle}>SERVICES</h3>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceItem}>
                {service} +
              </div>
            ))}
          </div>

          <h3 className={styles.sectionTitle}>CONTACT</h3>
          <div className={styles.contactSection}>
            <a href="mailto:oyotostudios@outlook.com" className={styles.email}>
              OYOTOSTUDIOS@OUTLOOK.COM
            </a>
          </div>

          <h3 className={styles.sectionTitle}>SOCIALS</h3>
          <div className={styles.servicesGrid}>
            <a href="https://oyoto.co.uk/" className={styles.serviceItem}>WEBSITE +</a>
            <a href="https://www.linkedin.com/in/james-mboma/" target="_blank" rel="noopener noreferrer" className={styles.serviceItem}>LINKEDIN +</a>
            <a href="https://instagram.com/oyotostudios/" className={styles.serviceItem}>INSTAGRAM +</a>
            <a href="https://github.com/mboma99" target="_blank" rel="noopener noreferrer" className={styles.serviceItem}>GITHUB +</a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
