"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { DecipherText } from "./DecipherText";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className={styles.overlay}>
          <span className={styles.viewLink}>[ VIEW CASE STUDY ]</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <DecipherText text={project.title} animateOnHover={true} />
          </h3>
          <span className={styles.year}>{project.year}</span>
        </div>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
