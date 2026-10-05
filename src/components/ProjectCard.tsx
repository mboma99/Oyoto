import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import PlateMedia from "@/components/PlateMedia";
import type { Project } from "@/data/projects";
import { titleCase } from "@/lib/text";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  return (
    <Link href={`/case-studies/${project.slug}`} className={styles.card}>
      <figure className={styles.plate}>
        <PlateMedia
          project={project}
          alt={`${titleCase(project.title)} project screenshot`}
          sizes="(max-width: 767px) 92vw, 46vw"
          className={styles.plateImage}
        />
      </figure>
      <div className={styles.meta}>
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <Heading className={styles.name}>
        {titleCase(project.title)}
        <ArrowUpRight className={styles.arrow} size={22} weight="light" aria-hidden="true" />
      </Heading>
      <p className={styles.desc}>{project.description}</p>
    </Link>
  );
}
