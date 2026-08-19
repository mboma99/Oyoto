import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { contactMailto } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PixelHeadline } from "@/components/PixelHeadline";

const featured = projects.slice(0, 3);

/* Words per marquee group — one group must stay wider than the viewport, or the
   loop runs out of content and shows a gap before it wraps. At the 10rem font cap
   a word is ~30rem, so 8 covers viewports up to ~3800px. */
const MARQUEE_REPEATS = 8;

export default function Home() {
  return (
    <div className={styles.page}>
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroMedia} aria-hidden="true">
            <Image
              src="/hero-images/trakr-v2.png"
              alt=""
              fill
              preload
              sizes="100vw"
              className={styles.heroImage}
            />
            <div className={styles.heroScrim} />
          </div>

          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>
              <span className={styles.dot} aria-hidden="true" />
              01 / Digital Product Studio
            </p>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}><span>DEFINE</span></span>
              <span className={styles.heroLine}><span>YOUR</span></span>
              <PixelHeadline text="FUTURE" />
            </h1>
            <div className={styles.heroFoot}>
              <p className={styles.heroBody}>
                Bridging brand vision and engineering reality — web, mobile and AI
                products built to last.
              </p>
              <span className={styles.heroRule} aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className={styles.marquee} aria-hidden="true">
          <div className={styles.marqueeTrack}>
            {/* two identical groups: the loop translates by exactly one group width */}
            {[0, 1].map((group) => (
              <div className={styles.marqueeGroup} key={group}>
                {Array.from({ length: MARQUEE_REPEATS }, (_, i) => (
                  <span key={i}>oyotō</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.about} id="about">
          <h2 className={styles.aboutTitle}>
            Building<br />digital<br />presence
          </h2>
          <div>
            <p className={styles.aboutLead}>
              We craft high-fidelity digital architectures that defy the ephemeral
              nature of the web.
            </p>
            <p className={styles.aboutBody}>
              Through strategic design systems and robust engineering, Oyotō builds
              platforms that look exceptional and perform flawlessly — from ecommerce
              launches to AI-driven products in closed beta.
            </p>
            <div className={styles.aboutGrid}>
              <Link href="/projects/congraduation" className={styles.aboutFrame}>
                <Image
                  src="/hero-images/congraduation-new.jpg"
                  alt="Congraduation platform"
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                />
              </Link>
              <Link
                href="/projects/the-well-church"
                className={`${styles.aboutFrame} ${styles.aboutFrameOffset}`}
              >
                <Image
                  src="/hero-images/well-church.png"
                  alt="The Well Church"
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.workHead}>
            <h2 className={styles.workTitle}>
              Selected<br />Work
            </h2>
            <Link href="/projects" className={styles.workLink}>
              View All Projects
            </Link>
          </div>
          <div className={styles.workGrid}>
            {featured.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`${styles.card} ${i === 1 ? styles.cardOffset : ""}`}
              >
                <div className={styles.cardFrame}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  <div className={styles.cardScrim} />
                  <div className={styles.cardMeta}>
                    <span className={styles.cardTag}>
                      {project.year} — {project.category}
                    </span>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.index} id="index">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.indexRow}
            >
              <div className={styles.indexRowInner}>
                <span className={styles.indexNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.indexTitle}>{project.title}</h3>
                <p className={styles.indexDesc}>{project.description}</p>
              </div>
            </Link>
          ))}
          <div className={styles.indexEnd} />
        </section>

        <section className={styles.contact} id="contact">
          <h2 className={styles.contactTitle}>
            Engineering<br />reality
          </h2>
          <a href={contactMailto} className={styles.contactCta}>
            Start a Project
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
