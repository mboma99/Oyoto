import Link from "next/link";
import { projects } from "@/data/projects";
import styles from "./ClientRow.module.css";

/* Client names set as type rather than their logos: no brand assets to
   license, and it sits with the rest of the editorial page. */
const clients = projects.filter((p) => p.client !== "In-House Project");

export function ClientRow() {
  if (clients.length === 0) return null;
  return (
    <section className={styles.row} aria-labelledby="clients-title">
      <h2 id="clients-title" className={styles.label}>
        Work for
      </h2>
      <ul className={styles.list}>
        {clients.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className={styles.name}>
              {p.client}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
