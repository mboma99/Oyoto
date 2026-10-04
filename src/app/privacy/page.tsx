import { PageTransition } from "@/components/PageTransition";
import { contactEmail, privacyEmail } from "@/lib/seo";
import styles from "./page.module.css";

/* Plain-language policy written from what the site actually does: no
   analytics, no cookies of its own, bookings through Cal.com, hosting on
   Netlify. Update it whenever that changes. */
const updated = "4 October 2026";

export default function Privacy() {
  return (
    <PageTransition>
      <main id="main" className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.title}>
            Privacy <em>policy</em>
          </h1>
          <p className={styles.updated}>Last updated {updated}</p>
        </header>

        <article className={styles.body}>
          <section>
            <h2>Who we are</h2>
            <p>
              Oyotō (&ldquo;Oyoto&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a digital product
              studio based in London, United Kingdom. We are responsible for the personal
              information described here. Questions about privacy go to{" "}
              <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
            </p>
          </section>

          <section>
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>When you book a call:</strong> your name, email address, any guests you add
                and anything you write about your project. Bookings are handled by Cal.com on our
                behalf.
              </li>
              <li>
                <strong>When you email us:</strong> your email address, name and whatever you
                choose to include in your message.
              </li>
              <li>
                <strong>When you visit the site:</strong> our hosting provider, Netlify, keeps
                standard server logs (such as IP address, browser type and pages requested) to
                deliver and secure the site.
              </li>
            </ul>
            <p>
              We don&apos;t use analytics or advertising trackers, and this site sets no cookies of
              its own. Cal.com may set cookies needed for its booking widget to work.
            </p>
          </section>

          <section>
            <h2>How we use it</h2>
            <p>
              We use your information to arrange and hold the call you booked, reply to your
              enquiry, and, if we work together, to deliver and invoice the project. Our legal
              basis is taking steps at your request before entering into a contract, and our
              legitimate interest in running and securing our business. We never sell your
              information or use it for marketing without your permission.
            </p>
          </section>

          <section>
            <h2>Who we share it with</h2>
            <p>
              Only the services we need to run the studio: Cal.com (scheduling and video calls),
              Apple iCloud Mail (email) and Netlify (website hosting). Some
              of these providers process data outside the UK; where they do, they rely on
              safeguards recognised under UK data protection law, such as standard contractual
              clauses.
            </p>
          </section>

          <section>
            <h2>How long we keep it</h2>
            <p>
              Enquiries and booking details are kept for up to two years after our last contact,
              unless we go on to work together, in which case project and billing records are
              kept for as long as the law requires (usually six years for accounting records).
            </p>
          </section>

          <section>
            <h2>Your rights</h2>
            <p>
              Under UK data protection law you can ask to see, correct or delete the information
              we hold about you, object to how we use it, or ask us to restrict or transfer it.
              Email <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a> and we&apos;ll respond
              within one month. If you&apos;re unhappy with how we&apos;ve handled your information,
              you can complain to the Information Commissioner&apos;s Office at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Privacy questions: <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
              <br />
              Everything else: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </section>
        </article>
      </main>
    </PageTransition>
  );
}
