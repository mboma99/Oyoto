"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { DecipherText } from "./DecipherText";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
      transition={{ 
        duration: 1, 
        delay: index * 0.1, // Full sequential stagger
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className={styles.cardWrapper}
    >
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
            <span className={styles.viewLink}>
              <DecipherText text="[ VIEW CASE STUDY ]" startScrambled={true} />
            </span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{project.title}</h3>
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
    </motion.div>
  );
}
