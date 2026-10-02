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

const filmProps = (priority?: boolean) =>
  ({
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
              src={phone.video}
              poster={phone.poster}
              aria-label={alt ? `${phone.label} screen recording` : undefined}
              {...filmProps(priority)}
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
        src={project.video}
        poster={project.image}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        {...filmProps(priority)}
      />
    );
  }

  return (
    <Image src={project.image} alt={alt} fill sizes={sizes} className={className} priority={priority} />
  );
}
