import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import styles from "./WorkStrip.module.css";

/** The work, laid flat under the book, for visitors who never open it. */
export function WorkStrip() {
  return (
    <section id="work" className={styles.strip} aria-labelledby="work-title">
      <header className={styles.head}>
        <h2 id="work-title" className={styles.title}>
          Selected <em>work</em>
        </h2>
        <Link href="/case-studies" className={styles.all}>
          All case studies <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
        </Link>
      </header>

      <ul className={styles.grid}>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
