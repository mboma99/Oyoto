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
    "BACKEND ENGINEERING",
    "MICROSERVICES ARCHITECTURE",
    "MACHINE LEARNING",
    "AUTHENTICATION & SECURITY",
    "CLOUD INFRASTRUCTURE (AWS)",
    "CI/CD AUTOMATION",
    "FINTECH SOLUTIONS",
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariants}
          >
            <h2 className={styles.sectionTitle}>[ STUDIO OVERVIEW ]</h2>
            <p className={styles.tagline}>
              OYOTO IS A HIGH-PERFORMANCE DIGITAL PRODUCT STUDIO specializing in building scalable, secure, and production-grade systems. 
              Led by James Mboma, we leverage deep expertise in enterprise microservices and machine learning to bridge the gap between complex engineering and human-centric design.
            </p>
            <p className={styles.subText}>
              [ CERTAIN ENTERPRISE PROJECTS MAY BE UNDER NDA* ]
            </p>
            <p className={styles.founder}>
              [ FOUNDED BY JAMES MBOMA | CURRENTLY ENGINEERING AT WORLDPAY ]
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
            <h3 className={styles.sectionTitle}>[ EXPERIENCE SELECTION ]</h3>
            <div className={styles.experienceGrid}>
              <div className={styles.experienceItem}>
                <span className={styles.expCompany}>WORLDPAY</span>
                <span className={styles.expRole}>SOFTWARE ENGINEER</span>
                <span className={styles.expYear}>2024 - PRESENT</span>
              </div>
              <div className={styles.experienceItem}>
                <span className={styles.expCompany}>NIKE</span>
                <span className={styles.expRole}>ML ENGINEER</span>
                <span className={styles.expYear}>2022 - 2023</span>
              </div>
              <div className={styles.experienceItem}>
                <span className={styles.expCompany}>LLOYDS BANK</span>
                <span className={styles.expRole}>DATA ANALYST</span>
                <span className={styles.expYear}>2024</span>
              </div>
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
