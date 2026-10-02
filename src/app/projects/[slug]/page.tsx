import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { projects } from "@/data/projects";
import { PageTransition } from "@/components/PageTransition";
import styles from "./page.module.css";

const CHAPTER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|\s)(\S)/g, (_, space: string, ch: string) => space + ch.toUpperCase());

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const words = titleCase(project.title).split(" ");
  const head = words.slice(0, -1).join(" ");
  const tail = words[words.length - 1];

  const sections = [
    { title: "Overview", body: project.caseStudy.overview },
    { title: "The challenge", body: project.caseStudy.challenge },
    { title: "The solution", body: project.caseStudy.solution },
    { title: "Outcome", body: project.caseStudy.outcome },
  ];

  return (
    <PageTransition>
      <main id="main" className={styles.page}>
        <Link href="/projects" className={styles.back}>
          <ArrowLeft size={16} weight="regular" aria-hidden="true" />
          All projects
        </Link>

        <header className={styles.hero}>
          <span className={styles.chapter}>
            Chapter {CHAPTER_WORDS[index] ?? index + 1}
          </span>
          <h1 className={styles.title}>
            {head && <span>{head} </span>}
            <em>{tail}</em>
          </h1>
          <p className={styles.lead}>{project.description}</p>
        </header>

        <dl className={styles.meta}>
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
        </dl>

        <ViewTransition name={`plate-${project.slug}`} share="plate-morph" default="none">
          <figure className={styles.plate}>
            <Image
              src={project.image}
              alt={`${titleCase(project.title)} project screenshot`}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className={styles.plateImage}
              priority
            />
          </figure>
        </ViewTransition>

        <div className={styles.body}>
          <aside className={styles.margin}>
            <h2 className={styles.marginTitle}>Stack</h2>
            <ul className={styles.stack}>
              {project.caseStudy.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </aside>

          <article className={styles.reading}>
            {sections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionBody}>{section.body}</p>
              </section>
            ))}
          </article>
        </div>

        <Link href={`/projects/${next.slug}`} className={styles.next}>
          <span className={styles.nextLabel}>Next chapter</span>
          <span className={styles.nextTitle}>
            {titleCase(next.title)}
            <ArrowUpRight className={styles.nextArrow} size={40} weight="light" aria-hidden="true" />
          </span>
          <span className={styles.nextDesc}>{next.description}</span>
        </Link>
      </main>
    </PageTransition>
  );
}
