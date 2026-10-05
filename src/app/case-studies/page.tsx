"use client";

import { useEffect, useState, ViewTransition } from "react";
import Image from "next/image";
import PlateMedia from "@/components/PlateMedia";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import styles from "./page.module.css";
import { projects } from "@/data/projects";
import { titleCase } from "@/lib/text";
import { PageTransition } from "@/components/PageTransition";

const ALL = "All work";
const filters = [ALL, ...Array.from(new Set(projects.map((p) => p.category)))];

/* The active filter lives in ?category= so it can be linked to and survives
   back/forward. Read it from window rather than useSearchParams, which would
   push the whole index out of the prerendered HTML. */
function filterFromUrl() {
  const category = new URLSearchParams(window.location.search).get("category");
  return category && filters.includes(category) ? category : ALL;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);

  useEffect(() => {
    const sync = () => setActiveFilter(filterFromUrl());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    const url = new URL(window.location.href);
    if (filter === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", filter);
    window.history.pushState(null, "", url);
  };

  const visible =
    activeFilter === ALL ? projects : projects.filter((p) => p.category === activeFilter);

  // keep the plate on a project that is actually listed
  const plateSlug = visible.some((p) => p.slug === activeSlug)
    ? activeSlug
    : visible[0]?.slug;

  return (
    <PageTransition>
      <main id="main" className={styles.page}>
        <header className={styles.intro}>
          <h1 className={styles.title}>
            The <em>archive</em>
          </h1>
          <p className={styles.lead}>
            Platforms, launches and products built since 2021. Choose one to read the full case
            study.
          </p>
          <div className={styles.filters} role="group" aria-label="Filter case studies by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={styles.pill}
                aria-pressed={activeFilter === filter}
                onClick={() => selectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className={styles.body}>
          {visible.length === 0 ? (
            <p className={styles.empty}>
              Nothing filed under this category yet.{" "}
              <button type="button" className={styles.emptyReset} onClick={() => selectFilter(ALL)}>
                Show all work
              </button>
            </p>
          ) : (
            <ol className={styles.list} key={activeFilter}>
              {visible.map((project, i) => {
                const num = projects.indexOf(project) + 1;
                const isActive = project.slug === plateSlug;
                return (
                  <li
                    key={project.slug}
                    className={styles.item}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className={styles.row}
                      data-active={isActive}
                      onMouseEnter={() => setActiveSlug(project.slug)}
                      onFocus={() => setActiveSlug(project.slug)}
                    >
                      <span className={styles.rowNum}>{String(num).padStart(2, "0")}</span>
                      <span className={styles.rowMain}>
                        <span className={styles.rowTitle}>{titleCase(project.title)}</span>
                        <span className={styles.rowDesc}>{project.description}</span>
                      </span>
                      <span className={styles.rowMeta}>
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </span>
                      <ArrowUpRight className={styles.rowArrow} size={22} weight="light" aria-hidden="true" />

                      {/* phones get the plate inline, under each row */}
                      <span className={styles.rowPlate} aria-hidden="true">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 92vw, 1px"
                          className={styles.plateImage}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          )}

          <aside className={styles.plate} aria-hidden="true">
            <div className={styles.plateFrame}>
              {visible.map((project) => {
                const isActive = project.slug === plateSlug;
                return (
                  /* Every layer keeps a fixed name. React only registers a name
                     on mount and forgets it by the name it has at unmount, so
                     toggling it with hover left a stale entry that collided
                     with the case study's plate. The clicked row is always the
                     active (visible) layer, so it is the one that morphs. */
                  <ViewTransition
                    key={project.slug}
                    name={`plate-${project.slug}`}
                    share="plate-morph"
                    default="none"
                  >
                    <div className={styles.plateLayer} data-active={isActive}>
                      <PlateMedia
                        project={project}
                        alt=""
                        sizes="(max-width: 767px) 1px, 40vw"
                        className={styles.plateImage}
                        priority={project.slug === projects[0].slug}
                      />
                    </div>
                  </ViewTransition>
                );
              })}
            </div>
            {plateSlug && (
              <p className={styles.plateCaption}>
                {projects.find((p) => p.slug === plateSlug)?.role}
              </p>
            )}
          </aside>
        </div>
      </main>
    </PageTransition>
  );
}
