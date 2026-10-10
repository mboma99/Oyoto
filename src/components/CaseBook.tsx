"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { LogoMark } from "@/components/Logo";
import PlateMedia from "@/components/PlateMedia";
import { projects, type Project } from "@/data/projects";
import { titleCase } from "@/lib/text";
import { contactEmail, contactMailto } from "@/lib/seo";
import styles from "./CaseBook.module.css";

/* ─── Book content ─── */

type Spread =
  | { kind: "contents"; id: string; label: string }
  | { kind: "project"; id: string; label: string; project: Project; chapter: number }
  | { kind: "colophon"; id: string; label: string };

const CHAPTER_WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const spreads: Spread[] = [
  { kind: "contents", id: "contents", label: "Contents" },
  ...projects.map((project, i) => ({
    kind: "project" as const,
    id: project.slug,
    label: titleCase(project.title),
    project,
    chapter: i + 1,
  })),
  { kind: "colophon", id: "colophon", label: "Contact" },
];

const LAST = spreads.length - 1;

/* The closed book's resting angle (degrees): leaning back, turned to show its
   page block on the right, and set down slightly askew. */
const REST_POSE = { x: 10, y: -14, z: -4 };
const FLAT_POSE = { x: 0, y: 0, z: 0 };
const leftFolio = (i: number) => i * 2 + 2;
const rightFolio = (i: number) => i * 2 + 3;

/* ─── Hooks ─── */

const narrowQuery = "(max-width: 767px)";
function useIsNarrow() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(narrowQuery);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(narrowQuery).matches,
    () => false
  );
}

/* ─── Pages ─── */

type PageProps = {
  spread: Spread;
  index: number;
  reveal?: boolean;
  onJump?: (to: number) => void;
  /** a copy on the turning leaf: films hold their last frame instead of playing */
  still?: boolean;
};

function RunningHead({ left, right }: { left: string; right: string }) {
  return (
    <div className={styles.runningHead}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function LeftPage({ spread, index, reveal }: PageProps) {
  if (spread.kind === "contents") {
    return (
      <div className={`${styles.pageInner} ${reveal ? styles.reveal : ""}`}>
        <RunningHead left="Oyotō" right="Preface" />
        <div className={styles.prefaceBody}>
          <h2 className={styles.prefaceTitle}>
            Bridging brand vision and <em>engineering reality.</em>
          </h2>
          <p className={`${styles.prefaceText} ${styles.prefaceIntro}`}>
            We design and build web, mobile and AI products for founders and teams, from
            ecommerce launches to AI products in closed beta.
          </p>
          <Link href="/contact" className={styles.textLink}>
            Contact <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          </Link>
        </div>
        <span className={styles.folio}>{leftFolio(index)}</span>
      </div>
    );
  }

  if (spread.kind === "project") {
    const { project, chapter } = spread;
    const words = titleCase(project.title).split(" ");
    const head = words.slice(0, -1).join(" ");
    const tail = words[words.length - 1];
    return (
      <div className={`${styles.pageInner} ${reveal ? styles.reveal : ""}`}>
        <RunningHead left={project.category} right={project.year} />
        <div className={styles.chapterBody}>
          <span className={styles.chapterLabel}>Chapter {CHAPTER_WORDS[chapter - 1] ?? chapter}</span>
          <h2 className={styles.chapterTitle}>
            {head && <span>{head} </span>}
            <em>{tail}</em>
          </h2>
          <p className={styles.chapterText}>{project.description}</p>
        </div>
        <div className={styles.pageFoot}>
          <span className={styles.folio}>{leftFolio(index)}</span>
          <Link
            href={`/case-studies/${project.slug}`}
            className={styles.textLink}
          >
            Read the case study <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.pageInner} ${reveal ? styles.reveal : ""}`}>
      <RunningHead left="Oyotō" right="Colophon" />
      <div className={styles.prefaceBody}>
        <h2 className={styles.prefaceTitle}>
          Have a project <em>in mind?</em>
        </h2>
        <p className={styles.prefaceText}>
          Tell us where you are and what you are building. We reply within a day.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/contact" className={styles.cta}>
            Contact
          </Link>
          <a href={contactMailto} className={styles.textLink}>
            {contactEmail}
          </a>
        </div>
      </div>
      <span className={styles.folio}>{leftFolio(index)}</span>
    </div>
  );
}

function RightPage({ spread, index, reveal, onJump, still }: PageProps) {
  if (spread.kind === "contents") {
    return (
      <div className={`${styles.pageInner} ${reveal ? styles.reveal : ""}`}>
        <RunningHead left="Selected work" right="2021-2026" />
        <div className={styles.contentsBody}>
          <h2 className={styles.contentsTitle}>Contents</h2>
          <ol className={styles.contentsList}>
            {spreads.slice(1).map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={styles.contentsRow}
                  onClick={() => onJump?.(i + 1)}
                  tabIndex={onJump ? 0 : -1}
                >
                  <span className={styles.contentsName}>{s.label}</span>
                  <span className={styles.contentsLeader} aria-hidden="true" />
                  <span className={styles.contentsFolio}>{leftFolio(i + 1)}</span>
                </button>
              </li>
            ))}
          </ol>
          <Link href="/case-studies" className={styles.textLink}>
            Browse every case study <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          </Link>
        </div>
        <span className={`${styles.folio} ${styles.folioRight}`}>{rightFolio(index)}</span>
      </div>
    );
  }

  if (spread.kind === "project") {
    const { project } = spread;
    return (
      <div className={`${styles.pageInner} ${styles.platePage} ${reveal ? styles.reveal : ""}`}>
        <figure className={styles.plate}>
          <div className={styles.plateFrame}>
            <PlateMedia
              project={project}
              alt={`${titleCase(project.title)} project screenshot`}
              sizes="(max-width: 767px) 92vw, 46vw"
              className={styles.plateImage}
              still={still}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>{project.role}</span>
            <span>{project.client}</span>
          </figcaption>
        </figure>
        <span className={`${styles.folio} ${styles.folioRight}`}>{rightFolio(index)}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.pageInner} ${reveal ? styles.reveal : ""}`}>
      <RunningHead left="Elsewhere" right="Oyotō" />
      <ul className={styles.elsewhere}>
        {[
          { href: "/services", label: "Services" },
          { href: "/case-studies", label: "All case studies" },
          { href: "/contact", label: "Book a call" },
        ].map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.elsewhereLink}>
              {item.label}
              <ArrowUpRight size={20} weight="light" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <span className={`${styles.folio} ${styles.folioRight}`}>{rightFolio(index)}</span>
    </div>
  );
}

/** Both halves stacked: how a spread reads on a phone. Project spreads lead
    with the plate; the others read in page order. */
function SinglePage(props: PageProps) {
  const plateFirst = props.spread.kind === "project";
  return (
    <div className={styles.single}>
      {plateFirst ? <RightPage {...props} /> : <LeftPage {...props} />}
      {plateFirst ? <LeftPage {...props} /> : <RightPage {...props} />}
    </div>
  );
}

/** What the studio does and how to start: the left flap on wide screens,
    and a block above the book everywhere else. */
function Pitch() {
  return (
    <div className={styles.pitch}>
      <p className={styles.flapTitle}>
        We design and build <em>web, mobile and AI products.</em>
      </p>
      <p className={styles.flapText}>
        A UK product studio for founders and teams, from first launch to scale, with work
        for Nike and Lloyds Banking Group.
      </p>
      <div className={styles.pitchActions}>
        <Link href="/contact" className={styles.pitchCta}>
          Book a call
        </Link>
        <a href="#work" className={styles.pitchLink}>
          See the work <ArrowDown size={14} weight="regular" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/* ─── The book ─── */

type Turn = { dir: "next" | "prev"; from: number; to: number };
type CoverState = "closed" | "opening" | "open";
/* Which spread each base half is revealing (its content rises in, its plate
   wipes up). It outlives the turn on purpose: the reveal runs ~1.6s but the
   turn lands at 0.95s, and dropping the class mid-animation snapped the plate
   and text to their end state (and made Safari redraw the film). It's only
   replaced when the next turn starts, by which point the animations are done. */
type Reveal = { left?: number; right?: number; single?: number } | null;

export function CaseBook() {
  const reduceMotion = useReducedMotion();
  const isNarrow = useIsNarrow();
  const [cover, setCover] = useState<CoverState>("closed");
  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [reveal, setReveal] = useState<Reveal>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLParagraphElement | null>(null);
  const swipeStart = useRef<number | null>(null);

  const isOpen = cover === "open";

  /* The closed book rests at an angle on the desk, in real perspective, and
     gives a few degrees more to the pointer; driven by motion values (no
     re-renders). It lies flat as it opens: text on a tilted 3D plane is
     resampled by the browser and reads soft. Phones keep the flat notepad. */
  const resting = cover === "closed" && !isNarrow;
  const pose = resting ? REST_POSE : FLAT_POSE;
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltZ = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 90, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 90, damping: 18 });
  const rotateZ = useSpring(tiltZ, { stiffness: 90, damping: 18 });

  useEffect(() => {
    tiltX.set(pose.x);
    tiltY.set(pose.y);
    tiltZ.set(pose.z);
    if (reduceMotion) {
      rotateX.jump(pose.x);
      rotateY.jump(pose.y);
      rotateZ.jump(pose.z);
    }
  }, [pose, reduceMotion, tiltX, tiltY, tiltZ, rotateX, rotateY, rotateZ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !resting || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(pose.y + px * 8);
    tiltX.set(pose.x - py * 6);
  };

  const resetTilt = () => {
    tiltX.set(pose.x);
    tiltY.set(pose.y);
    tiltZ.set(pose.z);
  };

  /** Opens the cover onto spread `at`: the contents by default, or a chapter
      picked from the jacket flap. */
  const openBook = (at = 0) => {
    if (cover !== "closed") return;
    setCurrent(at);
    if (reduceMotion) {
      setCover("open");
      return;
    }
    setReveal({ left: at, right: at, single: at });
    setCover("opening");
  };

  const goTo = useCallback(
    (to: number) => {
      if (!isOpen || turn || to === current || to < 0 || to > LAST) return;
      if (reduceMotion) {
        setCurrent(to);
        return;
      }
      const dir = to > current ? "next" : "prev";
      setReveal(dir === "next" ? { right: to, single: to } : { left: to });
      setTurn({ dir, from: current, to });
    },
    [isOpen, turn, current, reduceMotion]
  );

  const finishTurn = (e: React.AnimationEvent) => {
    if (e.target !== e.currentTarget || !turn) return;
    setCurrent(turn.to);
    setTurn(null);
  };

  const finishOpening = (e: React.AnimationEvent) => {
    if (e.target !== e.currentTarget) return;
    setCover("open");
  };

  /* animationend drives both state changes, but browsers suspend animations in
     background tabs; these timers (a little longer than the CSS durations)
     make sure the book can never get stuck mid-open or mid-turn. */
  useEffect(() => {
    if (cover !== "opening") return;
    const t = window.setTimeout(() => setCover("open"), 1400);
    return () => window.clearTimeout(t);
  }, [cover]);

  useEffect(() => {
    if (!turn) return;
    const t = window.setTimeout(() => {
      setCurrent(turn.to);
      setTurn(null);
    }, 1250);
    return () => window.clearTimeout(t);
  }, [turn]);

  // Keyboard: arrow keys turn pages once the book is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") goTo(current + 1);
      else if (e.key === "ArrowLeft") goTo(current - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, current, goTo]);

  // Hand focus to the book once the cover is out of the way
  useEffect(() => {
    if (isOpen) statusRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) < 50) return;
    goTo(dx < 0 ? current + 1 : current - 1);
  };

  const shown = turn ? turn.to : current;
  const jump = isOpen ? goTo : undefined;

  /* Which spread each base half shows. During a turn the leaf covers the half
     that is changing, so the page underneath is already the destination. */
  const baseLeft = turn ? (turn.dir === "next" ? turn.from : turn.to) : current;
  const baseRight = turn ? (turn.dir === "next" ? turn.to : turn.from) : current;
  /* On a phone the book is a top-bound notepad: going forward, the current
     sheet flips up off the stack and the next one is already underneath;
     going back, the previous sheet drops down over the current one. */
  const baseSingle = turn ? (turn.dir === "next" ? turn.to : turn.from) : current;
  const leafSingle = turn ? (turn.dir === "next" ? turn.from : turn.to) : current;
  const revealLeft = reveal?.left === baseLeft;
  const revealRight = reveal?.right === baseRight;

  return (
    <section className={styles.shell} aria-label="Selected work">
      <h1 className={styles.srOnly}>Oyotō, a UK web and app development studio: selected work</h1>

      <div className={styles.intro}>
        <Pitch />
      </div>

      <div className={styles.desk}>
        {/* Jacket flaps: a studio note and the volume's chapters either side of
            the closed cover, filling the desk until the book opens over them. */}
        <aside
          className={`${styles.flap} ${styles.flapLeft}`}
          data-visible={cover === "closed"}
          inert={cover !== "closed"}
          aria-label="About the studio"
        >
          <span className={styles.flapEyebrow}>Oyotō</span>
          <div className={styles.flapBody}>
            <Pitch />
          </div>
        </aside>

        <aside
          className={`${styles.flap} ${styles.flapRight}`}
          data-visible={cover === "closed"}
          inert={cover !== "closed"}
          aria-label="In this volume"
        >
          <span className={styles.flapEyebrow}>In this volume</span>
          <ol className={styles.flapList}>
            {projects.map((project, i) => (
              <li key={project.slug}>
                <button type="button" className={styles.flapRow} onClick={() => openBook(i + 1)}>
                  <span className={styles.flapNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.flapName}>{titleCase(project.title)}</span>
                  <span className={styles.flapMeta}>{project.category}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <motion.div
          className={styles.stageWrap}
          style={{ rotateX, rotateY, rotate: rotateZ, transformPerspective: 2600 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className={styles.stage} data-cover={cover}>
            <div
              ref={bookRef}
              className={styles.book}
              inert={!isOpen}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipeStart.current = null)}
            >
              <span className={styles.spine} aria-hidden="true" />

              {isNarrow ? (
                <div className={styles.page}>
                  <SinglePage
                    key={spreads[baseSingle].id}
                    spread={spreads[baseSingle]}
                    index={baseSingle}
                    reveal={reveal?.single === baseSingle}
                    onJump={jump}
                  />
                </div>
              ) : (
                <>
                  <div className={`${styles.page} ${styles.leftPage}`}>
                    <LeftPage
                      key={`${spreads[baseLeft].id}-l`}
                      spread={spreads[baseLeft]}
                      index={baseLeft}
                      reveal={revealLeft}
                    />
                  </div>
                  <div className={`${styles.page} ${styles.rightPage}`}>
                    <RightPage
                      key={`${spreads[baseRight].id}-r`}
                      spread={spreads[baseRight]}
                      index={baseRight}
                      reveal={revealRight}
                      onJump={jump}
                    />
                  </div>
                </>
              )}

              {turn && (
                <div
                  className={`${styles.leaf} ${turn.dir === "next" ? styles.leafNext : styles.leafPrev}`}
                  onAnimationEnd={finishTurn}
                  aria-hidden="true"
                >
                  <div className={`${styles.leafFace} ${styles.leafFront}`}>
                    {isNarrow ? (
                      <SinglePage spread={spreads[leafSingle]} index={leafSingle} still />
                    ) : turn.dir === "next" ? (
                      <RightPage spread={spreads[turn.from]} index={turn.from} still />
                    ) : (
                      <LeftPage spread={spreads[turn.from]} index={turn.from} />
                    )}
                    <span className={styles.shadeFront} />
                  </div>
                  <div className={`${styles.leafFace} ${styles.leafBack}`}>
                    {isNarrow ? null : turn.dir === "next" ? (
                      <LeftPage spread={spreads[turn.to]} index={turn.to} />
                    ) : (
                      <RightPage spread={spreads[turn.to]} index={turn.to} still />
                    )}
                    <span className={styles.shadeBack} />
                  </div>
                </div>
              )}
            </div>

            {cover !== "open" && (
              <button
                type="button"
                className={styles.cover}
                onClick={() => openBook()}
                onAnimationEnd={finishOpening}
                aria-label="Open the book of selected work"
                disabled={cover === "opening"}
              >
                <span className={`${styles.coverFace} ${styles.coverFront}`}>
                  <LogoMark className={styles.coverMark} />
                  <span className={styles.coverTitle}>
                    Define your <em>future</em>
                  </span>
                  <span className={styles.coverFoot}>
                    <span>Selected work, 2021-2026</span>
                    <span className={styles.coverPrompt}>
                      Open the book <ArrowRight size={14} weight="regular" aria-hidden="true" />
                    </span>
                  </span>
                </span>
                <span className={`${styles.coverFace} ${styles.coverInside}`} aria-hidden="true">
                  <LogoMark className={styles.insideMark} />
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <div className={styles.controls} data-visible={isOpen}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(current - 1)}
          disabled={!isOpen || current === 0 || !!turn}
          aria-label="Previous page"
        >
          <ArrowLeft size={18} weight="regular" />
        </button>
        <p
          ref={statusRef}
          className={styles.status}
          tabIndex={-1}
          aria-live="polite"
        >
          <span className={styles.statusLabel}>{spreads[shown].label}</span>
          <span className={styles.statusCount}>
            {shown + 1} of {spreads.length}
          </span>
        </p>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => goTo(current + 1)}
          disabled={!isOpen || current === LAST || !!turn}
          aria-label="Next page"
        >
          <ArrowRight size={18} weight="regular" />
        </button>
      </div>
      <p className={styles.hint} data-visible={isOpen} aria-hidden="true">
        {isNarrow ? "Swipe to turn the page" : "Arrow keys turn the page"}
      </p>
    </section>
  );
}
