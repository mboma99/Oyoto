import Image from "next/image";
import Link from "next/link";
import { clients, type Client } from "@/data/clients";
import styles from "./ClientRow.module.css";

function Mark({ client }: { client: Client }) {
  if (!client.logo) return <span className={styles.name}>{client.name}</span>;
  return (
    <Image
      src={client.logo.src}
      alt={client.name}
      width={client.logo.width}
      height={client.logo.height}
      className={styles.logo}
      style={{ "--scale": client.scale ?? 1 } as React.CSSProperties}
    />
  );
}

/** One pass of the logos. The marquee renders it twice; the copy is hidden
    from assistive tech and the tab order so each client is announced once. */
function Logos({ copy = false }: { copy?: boolean }) {
  return (
    <ul className={styles.list} aria-hidden={copy || undefined}>
      {clients.map((client) => (
        <li key={client.name}>
          {client.projectSlug ? (
            <Link
              href={`/case-studies/${client.projectSlug}`}
              className={styles.item}
              aria-label={`${client.name} case study`}
              tabIndex={copy ? -1 : undefined}
            >
              <Mark client={client} />
            </Link>
          ) : (
            <span className={styles.item}>
              <Mark client={client} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Who we've worked with: one-colour logos drifting past in a loop, each
    linking to its case study. Hover pauses it; reduced motion holds it still. */
export function ClientRow() {
  if (clients.length === 0) return null;
  return (
    <section className={styles.row} aria-labelledby="clients-title">
      <h2 id="clients-title" className={styles.label}>
        Worked with
      </h2>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <Logos />
          <Logos copy />
        </div>
      </div>
    </section>
  );
}
