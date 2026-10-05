import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PageTransition } from "@/components/PageTransition";
import { ProjectCard } from "@/components/ProjectCard";
import { services } from "@/data/services";
import { getProjectBySlug } from "@/lib/seo";
import styles from "./page.module.css";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const words = service.title.split(" ");
  const head = words.slice(0, -1).join(" ");
  const tail = words[words.length - 1];
  const work = service.projects
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter((p) => p !== undefined);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <PageTransition>
      <main id="main" className={styles.page}>
        <Link href="/services" className={styles.back}>
          <ArrowLeft size={16} weight="regular" aria-hidden="true" />
          All services
        </Link>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>{service.name}</span>
          <h1 className={styles.title}>
            {head && <span>{head} </span>}
            <em>{tail}</em>
          </h1>
          <p className={styles.lead}>{service.intro}</p>
          <div className={styles.actions}>
            <Link href="/contact" className={styles.ctaButton}>
              Book a call
            </Link>
            <a href="#work" className={styles.textLink}>
              See the work
            </a>
          </div>
        </header>

        <div className={styles.body}>
          <aside className={styles.margin}>
            <h2 className={styles.marginTitle}>A good fit if</h2>
            <ul className={styles.fit}>
              {service.fit.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h2 className={styles.marginTitle}>Stack</h2>
            <ul className={styles.stack}>
              {service.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </aside>

          <section aria-labelledby="offers-title">
            <h2 id="offers-title" className={styles.sectionTitle}>
              What&apos;s included
            </h2>
            <ol className={styles.offers}>
              {service.offers.map((offer, i) => (
                <li key={offer.title} className={styles.offer}>
                  <span className={styles.offerNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerBody}>{offer.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section id="work" className={styles.work} aria-labelledby="work-title">
          <h2 id="work-title" className={styles.sectionTitle}>
            The <em>work</em>
          </h2>
          <ul className={styles.workGrid}>
            {work.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            Have a project <em>in mind?</em>
          </h2>
          <p className={styles.ctaText}>
            Tell us where you are and what you&apos;re building. We reply within a day.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Book a call
          </Link>
        </section>

        <nav className={styles.others} aria-label="Other services">
          <span className={styles.othersLabel}>Other services</span>
          <ul>
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={styles.otherLink}>
                  {s.name}
                  <ArrowUpRight size={20} weight="light" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </PageTransition>
  );
}
