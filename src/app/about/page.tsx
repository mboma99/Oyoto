"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "./page.module.css";
import { CursorParticles } from "@/components/CursorParticles";
import { Footer } from "@/components/Footer";

const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

const scrollVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
  }
};

export default function About() {
  const services = [
    "FULL-STACK DEVELOPMENT",
    "CLOUD ARCHITECTURE",
    "UI/UX ENGINEERING",
    "AI INTEGRATION",
    "MOBILE APPS",
    "BUSINESS INTELLIGENCE",
    "TECHNICAL CONSULTING",
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
          >
            <h2 className={styles.sectionTitle}>[ STUDIO OVERVIEW ]</h2>
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
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            style={{ marginTop: "6rem" }}
          >
            <h3 className={styles.sectionTitle}>[ EXPERTISE ]</h3>
            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <div key={index} className={styles.serviceItem}>
                  {service} +
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
            style={{ marginTop: "6rem" }}
          >
            <h3 className={styles.sectionTitle}>[ CONNECT ]</h3>
            <div className={styles.contactSection}>
              <a href="mailto:oyotostudios@outlook.com" className={styles.email}>
                OYOTOSTUDIOS@OUTLOOK.COM
              </a>
            </div>

            <div className={styles.servicesGrid} style={{ marginTop: "2rem" }}>
              <a href="https://github.com/mboma99" target="_blank" rel="noopener noreferrer" className={styles.serviceItem}>GITHUB +</a>
              <a href="https://www.linkedin.com/in/james-mboma/" target="_blank" rel="noopener noreferrer" className={styles.serviceItem}>LINKEDIN +</a>
              <Link href="/resume" className={styles.serviceItem}>VIEW FULL RESUME +</Link>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
