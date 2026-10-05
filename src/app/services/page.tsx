import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PageTransition } from "@/components/PageTransition";
import { getProjectBySlug } from "@/lib/seo";
import { services } from "@/data/services";
import { titleCase } from "@/lib/text";
import styles from "./page.module.css";

export default function Services() {
  return (
    <PageTransition>
      <main id="main" className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.title}>
            What we <em>build</em>
          </h1>
          <p className={styles.lead}>
            Four kinds of work, each backed by a case study you can read. Most projects mix two or
            three of them.
          </p>
        </header>

        <ol className={styles.list}>
          {services.map((service, i) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className={styles.row}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.rowMain}>
                  <span className={styles.name}>{service.name}</span>
                  <span className={styles.desc}>{service.description}</span>
                </span>
                <span className={styles.proof}>
                  {service.projects
                    .map((slug) => getProjectBySlug(slug))
                    .filter((p) => p !== undefined)
                    .map((p) => titleCase(p.title))
                    .join(", ")}
                </span>
                <ArrowUpRight className={styles.arrow} size={28} weight="light" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            Not sure which <em>fits?</em>
          </h2>
          <p className={styles.ctaText}>
            Tell us what you&apos;re building and we&apos;ll tell you how we&apos;d approach it, in a
            30-minute call.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Book a call
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
