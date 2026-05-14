"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import { CursorParticles } from "@/components/CursorParticles";
import { Footer } from "@/components/Footer";

const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

const scrollVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
  }
};

export default function Resume() {
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
          <motion.div initial="hidden" animate="visible" variants={scrollVariants} className={styles.resumeHeader}>
            <h1 className={styles.name}>JAMES MBOMA</h1>
            <p className={styles.role}>SOFTWARE ENGINEER</p>
            <div className={styles.contactInfo}>
              <a href="mailto:oyotostudios@outlook.com">oyotostudios@outlook.com</a>
              <div className={styles.links}>
                <a href="https://linkedin.com/in/james-mboma" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                <a href="https://github.com/mboma99" target="_blank" rel="noopener noreferrer">GITHUB</a>
              </div>
            </div>
          </motion.div>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollVariants} className={styles.section}>
            <h2 className={styles.sectionTitle}>[ PROFILE ]</h2>
            <p className={styles.bodyText}>
              Backend-focused Software Engineer specialising in authentication, security, and highly available microservices within fintech and enterprise environments.
              Experienced in building scalable systems using Java, Spring Boot, and AWS, with a proven record of improving system resilience, onboarding efficiency, and test automation.
            </p>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollVariants} className={styles.section}>
            <h2 className={styles.sectionTitle}>[ WORK EXPERIENCE ]</h2>

            <div className={styles.experienceItem}>
              <div className={styles.expHeader}>
                <h3 className={styles.company}>WORLDPAY</h3>
                <span className={styles.location}>LONDON</span>
                <span className={styles.period}>SEP 2024 - PRESENT</span>
              </div>
              <p className={styles.expTitle}>SOFTWARE ENGINEER</p>
              <ul className={styles.bulletList}>
                <li>Maintain security of critical authentication edge services, fixing service vulnerabilities and updating service dependencies.</li>
                <li>Designed and built a production-grade performance testing environment for a client-facing mTLS platform used by a major UK supermarket chain ahead of peak trading period.</li>
                <li>Expanded Java-based onboarding services, reducing SMB merchant onboarding time from two weeks to under one hour.</li>
                <li>Automated end-to-end testing by integrating Postman CLI into an AWS EC2 environment and Jenkins CI/CD pipelines, reducing QA execution time by 80%.</li>
                <li>Led disaster recovery and resilience testing across distributed microservices, validating failover mechanisms and ensuring compliance with 99.999% SLA targets.</li>
              </ul>
            </div>

            <div className={styles.experienceItem}>
              <div className={styles.expHeader}>
                <h3 className={styles.company}>LLOYDS BANKING GROUP</h3>
                <span className={styles.location}>BIRMINGHAM</span>
                <span className={styles.period}>JUN 2024 – AUG 2024</span>
              </div>
              <p className={styles.expTitle}>DATA ANALYST</p>
              <ul className={styles.bulletList}>
                <li>Built data transformation pipelines to support senior leadership with improved reporting and analysis.</li>
                <li>Developed a proof of concept using Copilot to summarise and categorise client presentations, reducing delivery time of critical analysis by 30%.</li>
                <li>Collaborated with stakeholders to translate operational requirements into actionable data insights.</li>
              </ul>
            </div>

            <div className={styles.experienceItem}>
              <div className={styles.expHeader}>
                <h3 className={styles.company}>NIKE</h3>
                <span className={styles.location}>HILVERSUM</span>
                <span className={styles.period}>SEP 2022 – AUG 2023</span>
              </div>
              <p className={styles.expTitle}>MACHINE LEARNING ENGINEER</p>
              <ul className={styles.bulletList}>
                <li>Developed a recommender system using Databricks, Snowflake, and PySpark to increase user lifetime value.</li>
                <li>Built a classification model using a feedforward neural network, doubling user engagement across Nike platforms.</li>
                <li>Refactored ML pipelines and removed redundant data sources, reducing cloud costs and improving model build times.</li>
                <li>Implemented automated unit testing to ensure reliability and data integrity.</li>
              </ul>
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollVariants} className={styles.section}>
            <h2 className={styles.sectionTitle}>[ SKILLS ]</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h4>BACKEND</h4>
                <p>Java (Spring Boot), Python (FastAPI), Fastly</p>
              </div>
              <div className={styles.skillCategory}>
                <h4>CLOUD</h4>
                <p>AWS (EC2, S3, IAM, ECS, ECR), Docker, Redis, Vault</p>
              </div>
              <div className={styles.skillCategory}>
                <h4>CI/CD</h4>
                <p>Jenkins, Concourse, GitHub Actions</p>
              </div>
              <div className={styles.skillCategory}>
                <h4>DATABASES</h4>
                <p>PostgreSQL, Snowflake, Cassandra, DynamoDB, SQLAlchemy/SQLModel</p>
              </div>
              <div className={styles.skillCategory}>
                <h4>TESTING</h4>
                <p>JUnit, Postman, TDD, JaCoCo, Pytest</p>
              </div>
            </div>
          </motion.section>

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollVariants} className={styles.section}>
            <h2 className={styles.sectionTitle}>[ EDUCATION ]</h2>
            <div className={styles.educationItem}>
              <h3 className={styles.university}>DE MONTFORT UNIVERSITY</h3>
              <p className={styles.degree}>BSc SOFTWARE ENGINEERING WITH YEAR IN INDUSTRY - FIRST CLASS</p>
              <span className={styles.period}>2020 – 2024</span>
            </div>
          </motion.section>

          <div className={styles.resumeActions}>
            <a
              href="/James Mboma.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadBtn}
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              [ OPEN PDF RESUME ]
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
