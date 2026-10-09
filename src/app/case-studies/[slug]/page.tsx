import { ViewTransition } from "react";
import Image from "next/image";
import PlateMedia from "@/components/PlateMedia";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { projects, type Shot } from "@/data/projects";
import { servicesForProject } from "@/data/services";
import { titleCase } from "@/lib/text";
import { PageTransition } from "@/components/PageTransition";
import styles from "./page.module.css";

/** Screenshots are taken at 1440 × 900. */
function Screen({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <figure className={styles.screen}>
      <div className={styles.screenFrame}>
        <Image src={shot.src} alt={shot.alt} width={1440} height={900} sizes={sizes} />
      </div>
      <figcaption className={styles.screenCaption}>{shot.caption}</figcaption>
    </figure>
  );
}

const CHAPTER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

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
  const related = servicesForProject(project.slug);
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
        <Link href="/case-studies" className={styles.back}>
          <ArrowLeft size={16} weight="regular" aria-hidden="true" />
          All case studies
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
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.live}
            >
              Visit the live site
              <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
            </a>
          )}
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
            <PlateMedia
              project={project}
              alt={`${titleCase(project.title)} project screenshot`}
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
            {related.length > 0 && (
              <>
                <h2 className={`${styles.marginTitle} ${styles.marginTitleNext}`}>Service</h2>
                <ul className={styles.services}>
                  {related.map((service) => (
                    <li key={service.slug}>
                      <Link href={`/services/${service.slug}`} className={styles.serviceLink}>
                        {service.name}
                        <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
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

        {project.comparisons && (
          <section className={styles.screens} aria-labelledby="before-after-title">
            <h2 id="before-after-title" className={styles.sectionTitle}>
              Before and <em>after</em>
            </h2>
            {project.comparisons.map((pair) => (
              <div key={pair.after.src} className={styles.pair}>
                <Screen shot={pair.before} sizes="(max-width: 767px) 100vw, 700px" />
                <Screen shot={pair.after} sizes="(max-width: 767px) 100vw, 700px" />
              </div>
            ))}
          </section>
        )}

        {project.gallery && (
          <section className={styles.screens} aria-labelledby="gallery-title">
            <h2 id="gallery-title" className={styles.sectionTitle}>
              Inside the <em>build</em>
            </h2>
            <div className={styles.gallery}>
              {project.gallery.map((shot) => (
                <Screen key={shot.src} shot={shot} sizes="(max-width: 767px) 100vw, 700px" />
              ))}
            </div>
          </section>
        )}

        {project.mobile && (
          <section className={styles.screens} aria-labelledby="mobile-title">
            <h2 id="mobile-title" className={styles.sectionTitle}>
              On a <em>phone</em>
            </h2>
            <figure className={styles.phonePlate}>
              <PlateMedia
                project={{ ...project, video: undefined, image: project.mobile[0].poster, phones: project.mobile }}
                alt={`${titleCase(project.title)} on a phone`}
                sizes="(max-width: 1400px) 100vw, 1400px"
                className={styles.phonePlateImage}
              />
            </figure>
          </section>
        )}

        <Link href={`/case-studies/${next.slug}`} className={styles.next}>
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
