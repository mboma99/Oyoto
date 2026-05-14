"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { CursorParticles } from "@/components/CursorParticles";
import { Footer } from "@/components/Footer";

const DecipherText = dynamic(() => import("@/components/DecipherText").then(mod => mod.DecipherText), {
  ssr: false,
});

export default function ProjectsPage() {
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
          <h2 className={styles.sectionTitle}>[ SELECTED WORKS ]</h2>
          
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
