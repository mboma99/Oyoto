import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import styles from "./Testimonials.module.css";

/** Client quotes. Renders nothing until there are real ones to show. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className={styles.title}>
        In their <em>words</em>
      </h2>
      <ul className={styles.grid}>
        {testimonials.map((t) => (
          <li key={`${t.name}-${t.organisation}`}>
            <figure className={styles.card}>
              <blockquote className={styles.quote}>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className={styles.who}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.role}>
                  {t.role}, {t.organisation}
                </span>
                {t.projectSlug && (
                  <Link href={`/case-studies/${t.projectSlug}`} className={styles.link}>
                    Read the case study
                  </Link>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
