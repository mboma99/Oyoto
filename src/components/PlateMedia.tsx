"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import styles from "./PlateMedia.module.css";

type Props = {
  project: Project;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/* Where each film has got to, by src. A plate's <video> is re-created more
   often than it looks: the book's turning leaf is a fresh copy of the page,
   the page beneath remounts when the turn lands, and a route change swaps the
   archive's plate for the case study's. When a copy goes away it leaves its
   time and its current frame here; the copy that replaces it shows that frame
   as its poster while it seeks to the same moment, so the film carries on
   instead of flashing back to the start. */
type Playhead = { time: number; at: number; frame?: string };
const playheads = new Map<string, Playhead>();

function grabFrame(video: HTMLVideoElement): string | undefined {
  if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth) return;
  const scale = Math.min(1, 800 / video.videoWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  try {
    canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  } catch {
    return undefined;
  }
}

/* One ref callback per src, so React doesn't detach and re-attach it (and
   re-seek the film) every time the plate re-renders. */
const resumeRefs = new Map<string, (video: HTMLVideoElement | null) => (() => void) | void>();

function resumeFilm(src: string) {
  const cached = resumeRefs.get(src);
  if (cached) return cached;
  const ref = (video: HTMLVideoElement | null) => {
    if (!video) return;
    const saved = playheads.get(src);
    if (saved?.frame) video.poster = saved.frame;

    const resume = () => {
      const head = playheads.get(src);
      if (!head || !Number.isFinite(video.duration) || video.duration <= 0) return;
      // carry on as if it had kept playing while no copy was on screen
      const t = (head.time + (performance.now() - head.at) / 1000) % video.duration;
      // only seek when this copy is actually behind; avoids a visible hitch
      if (Math.abs(video.currentTime - t) > 0.25) video.currentTime = t;
    };
    const record = () =>
      playheads.set(src, { ...playheads.get(src), time: video.currentTime, at: performance.now() });

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) resume();
    video.addEventListener("loadedmetadata", resume);
    video.addEventListener("timeupdate", record);
    return () => {
      video.removeEventListener("loadedmetadata", resume);
      video.removeEventListener("timeupdate", record);
      playheads.set(src, { time: video.currentTime, at: performance.now(), frame: grabFrame(video) });
    };
  };
  resumeRefs.set(src, ref);
  return ref;
}

const filmProps = (src: string, priority?: boolean) =>
  ({
    ref: resumeFilm(src),
    src,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: priority ? "auto" : "metadata",
  }) as const;

/* A project's plate. Screen recordings sit whole in phone shells, side by
   side; any other film fills the plate the way <Image fill> does; otherwise
   the still. Reduced-motion visitors get the still instead of any film. */
export default function PlateMedia({ project, alt, sizes, className, priority }: Props) {
  const reduceMotion = useReducedMotion();

  if (project.phones?.length && !reduceMotion) {
    return (
      <div
        className={`${styles.stage} ${className ?? ""}`}
        style={
          {
            "--screen-ratio": project.screenRatio ?? 9 / 19.5,
            "--phones": project.phones.length,
          } as React.CSSProperties
        }
        role={alt ? "group" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        {project.phones.map((phone) => (
          <div key={phone.video} className={styles.phone}>
            <video
              className={styles.screen}
              poster={phone.poster}
              aria-label={alt ? `${phone.label} screen recording` : undefined}
              {...filmProps(phone.video, priority)}
            />
          </div>
        ))}
      </div>
    );
  }

  if (project.video && !reduceMotion) {
    return (
      <video
        className={`${styles.fill} ${className ?? ""}`}
        // inline so the plate's own object-position (top-left, for screenshots) can't win
        style={{ objectPosition: "center" }}
        poster={project.image}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        {...filmProps(project.video, priority)}
      />
    );
  }

  return (
    <Image src={project.image} alt={alt} fill sizes={sizes} className={className} priority={priority} />
  );
}
