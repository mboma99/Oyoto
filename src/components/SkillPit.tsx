"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SkillPit.module.css";

export type SkillColor =
  | "sage"
  | "amber"
  | "violet"
  | "blue"
  | "mint"
  | "gold"
  | "rose"
  | "white";

export interface SkillItem {
  name: string;
  color?: SkillColor;
}

interface SkillPitProps {
  skills?: (string | SkillItem)[];
}

export const DEFAULT_SKILLS: SkillItem[] = [
  { name: "Machine Learning ", color: "blue" },
  { name: "Java", color: "white" },
  { name: "Brand Creation", color: "blue" },
  { name: "FastAPI", color: "sage" },
  { name: "Customer Analysis", color: "amber" },
  { name: "PostgreSQL", color: "mint" },
  { name: "Mobile Applications", color: "violet" },
  { name: "Strategy", color: "rose" },
  { name: "Automation", color: "gold" },
  { name: "Growth Hacking", color: "sage" },
  { name: "AI Workflows", color: "violet" },
  { name: "UI/UX Strategy", color: "amber" },
];

const WALL_THICKNESS = 300;
const GRAVITY_Y = 0.85;
const RESTITUTION = 0.38;
const FRICTION = 0.35;
const FRICTION_AIR = 0.015;

export function SkillPit({ skills = DEFAULT_SKILLS }: SkillPitProps) {
  const normalizedSkills: SkillItem[] = skills.map((s, i) => {
    if (typeof s === "string") {
      const colors: SkillColor[] = ["blue", "sage", "amber", "violet", "mint", "gold", "rose", "white"];
      return { name: s, color: colors[i % colors.length] };
    }
    return s;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isLive, setIsLive] = useState(false);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const engineRef = useRef<any>(null);
  const bodiesRef = useRef<{ body: any; el: HTMLSpanElement; w: number; h: number; index: number }[]>([]);
  const obstaclesRef = useRef<{ el: HTMLElement; body: any }[]>([]);
  const dragConstraintRef = useRef<any>(null);
  const activePointerRef = useRef<{
    pointerId: number;
    targetEl: HTMLSpanElement;
  } | null>(null);
  /* eslint-enable @typescript-eslint/no-explicit-any */

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopPhysics = () => { };
    let cancelled = false;

    import("matter-js").then((Matter) => {
      if (cancelled) return;

      const { Engine, Runner, World, Bodies, Body, Composite } = Matter;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      const engine = Engine.create({
        positionIterations: 16,
        velocityIterations: 16,
      });
      engine.gravity.y = GRAVITY_Y;
      engineRef.current = engine;

      // Rigid boundaries: Floor, Left wall, Right wall, Ceiling
      const floor = Bodies.rectangle(
        width / 2,
        height + WALL_THICKNESS / 2,
        width + WALL_THICKNESS * 4,
        WALL_THICKNESS,
        { isStatic: true, friction: 0.8, restitution: RESTITUTION }
      );
      const leftWall = Bodies.rectangle(
        -WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height * 6,
        { isStatic: true, friction: 0.2, restitution: RESTITUTION }
      );
      const rightWall = Bodies.rectangle(
        width + WALL_THICKNESS / 2,
        height / 2,
        WALL_THICKNESS,
        height * 6,
        { isStatic: true, friction: 0.2, restitution: RESTITUTION }
      );
      const ceiling = Bodies.rectangle(
        width / 2,
        -height * 2 - WALL_THICKNESS / 2,
        width + WALL_THICKNESS * 4,
        WALL_THICKNESS,
        { isStatic: true }
      );

      const walls = [floor, leftWall, rightWall, ceiling];
      World.add(engine.world, walls);

      // Create static physical bodies for text obstacles (Aesthetic Restraint, CRAFTING, CONTEXT)
      const obstacleElements = Array.from(
        (container.parentElement || container).querySelectorAll<HTMLElement>("[data-physics-obstacle]")
      );

      const containerRect = container.getBoundingClientRect();
      const obstacles = obstacleElements.map((el) => {
        const rect = el.getBoundingClientRect();
        const w = Math.max(10, rect.width);
        const h = Math.max(10, rect.height);
        const x = rect.left - containerRect.left + w / 2;
        const y = rect.top - containerRect.top + h / 2;

        const body = Bodies.rectangle(x, y, w, h, {
          isStatic: true,
          restitution: 0.35,
          friction: 0.3,
        });

        return { el, body };
      });

      obstaclesRef.current = obstacles;
      if (obstacles.length > 0) {
        World.add(
          engine.world,
          obstacles.map((o) => o.body)
        );
      }

      // Create Matter bodies corresponding to DOM pill elements
      const pills = pillRefs.current.filter(Boolean) as HTMLSpanElement[];
      const bodies = pills.map((el, i) => {
        const w = el.offsetWidth || 150;
        const h = el.offsetHeight || 50;

        const initialX = Math.max(w / 2 + 20, Math.min(width - w / 2 - 20, Math.random() * width));
        // Staggered drop from above the viewport
        const initialY = -h - 30 - i * 45 - Math.random() * (height * 0.35);

        const body = Bodies.rectangle(initialX, initialY, w, h, {
          chamfer: { radius: Math.min(h / 2, 22) },
          restitution: RESTITUTION,
          friction: FRICTION,
          frictionAir: FRICTION_AIR,
          density: 0.004,
        });

        Body.setAngle(body, (Math.random() - 0.5) * 0.45);
        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 1.5,
          y: Math.random() * 2,
        });

        return { body, el, w, h, index: i };
      });

      bodiesRef.current = bodies;
      World.add(
        engine.world,
        bodies.map((b) => b.body)
      );

      bodies.forEach(({ el }) => el.classList.add(styles.pillLive));
      setIsLive(true);

      // Track text positions during the initial 3 seconds while reveal animation runs
      const animStartTime = performance.now();
      const syncObstaclePositions = () => {
        const curContainerRect = container.getBoundingClientRect();
        if (!curContainerRect.width || !curContainerRect.height) return;

        for (const obs of obstaclesRef.current) {
          const rect = obs.el.getBoundingClientRect();
          const w = Math.max(10, rect.width);
          const h = Math.max(10, rect.height);
          const x = rect.left - curContainerRect.left + w / 2;
          const y = rect.top - curContainerRect.top + h / 2;

          Body.setPosition(obs.body, { x, y });
        }
      };

      // Animation loop syncing Matter coordinates to DOM
      let rafId = 0;
      const syncDOM = () => {
        rafId = requestAnimationFrame(syncDOM);

        if (performance.now() - animStartTime < 3000) {
          syncObstaclePositions();
        }

        for (const { body, el, w, h } of bodies) {
          const posX = body.position.x - w / 2;
          const posY = body.position.y - h / 2;
          const rad = body.angle;
          el.style.transform = `translate3d(${posX}px, ${posY}px, 0px) rotate(${rad}rad)`;
        }
      };

      const runner = Runner.create();
      let isRunning = false;

      const startSim = () => {
        if (isRunning) return;
        isRunning = true;
        Runner.run(runner, engine);
        rafId = requestAnimationFrame(syncDOM);
      };

      const pauseSim = () => {
        if (!isRunning) return;
        isRunning = false;
        Runner.stop(runner);
        cancelAnimationFrame(rafId);
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startSim();
          } else {
            pauseSim();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        Body.setPosition(floor, { x: w / 2, y: h + WALL_THICKNESS / 2 });
        Body.setPosition(leftWall, { x: -WALL_THICKNESS / 2, y: h / 2 });
        Body.setPosition(rightWall, { x: w + WALL_THICKNESS / 2, y: h / 2 });
        Body.setPosition(ceiling, { x: w / 2, y: -h * 2 - WALL_THICKNESS / 2 });
        syncObstaclePositions();
      };

      window.addEventListener("resize", handleResize);

      stopPhysics = () => {
        pauseSim();
        observer.disconnect();
        window.removeEventListener("resize", handleResize);
        if (dragConstraintRef.current) {
          World.remove(engine.world, dragConstraintRef.current);
          dragConstraintRef.current = null;
        }
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        engineRef.current = null;
        bodiesRef.current = [];
        obstaclesRef.current = [];
      };
    });

    return () => {
      cancelled = true;
      stopPhysics();
    };
  }, [normalizedSkills.length]);

  // Pointer drag via physical spring constraint: prevents pills from clipping through obstacles
  const handlePointerDown = (e: React.PointerEvent<HTMLSpanElement>, index: number) => {
    if (!isLive || !bodiesRef.current[index] || !engineRef.current) return;
    const item = bodiesRef.current[index];
    const container = containerRef.current;
    if (!container) return;

    const el = e.currentTarget;
    try {
      el.setPointerCapture(e.pointerId);
    } catch { }
    el.classList.add(styles.pillDragging);

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    activePointerRef.current = {
      pointerId: e.pointerId,
      targetEl: el,
    };

    import("matter-js").then((Matter) => {
      const { Constraint, World } = Matter;
      if (!engineRef.current) return;

      if (dragConstraintRef.current) {
        World.remove(engineRef.current.world, dragConstraintRef.current);
      }

      const offsetX = Math.max(-item.w / 2 + 8, Math.min(item.w / 2 - 8, px - item.body.position.x));
      const offsetY = Math.max(-item.h / 2 + 8, Math.min(item.h / 2 - 8, py - item.body.position.y));

      const constraint = Constraint.create({
        pointA: { x: px, y: py },
        bodyB: item.body,
        pointB: { x: offsetX, y: offsetY },
        stiffness: 0.25,
        damping: 0.08,
      });

      dragConstraintRef.current = constraint;
      World.add(engineRef.current.world, constraint);
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const active = activePointerRef.current;
    if (!active || active.pointerId !== e.pointerId || !dragConstraintRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    dragConstraintRef.current.pointA = { x: px, y: py };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    const active = activePointerRef.current;
    if (!active || active.pointerId !== e.pointerId) return;

    try {
      active.targetEl.releasePointerCapture(e.pointerId);
    } catch { }
    active.targetEl.classList.remove(styles.pillDragging);
    activePointerRef.current = null;

    if (dragConstraintRef.current && engineRef.current) {
      import("matter-js").then((Matter) => {
        const { World } = Matter;
        if (engineRef.current && dragConstraintRef.current) {
          World.remove(engineRef.current.world, dragConstraintRef.current);
          dragConstraintRef.current = null;
        }
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${!isLive ? styles.staticFallback : ""}`}
      aria-label="Interactive skills falling tags"
    >
      {normalizedSkills.map((skill, i) => {
        const colorKey = skill.color || "white";
        const colorClass = styles[`pill_${colorKey}`] || styles.pill_white;

        return (
          <span
            key={skill.name}
            ref={(el) => {
              pillRefs.current[i] = el;
            }}
            onPointerDown={(e) => handlePointerDown(e, i)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`${styles.pill} ${colorClass}`}
          >
            <span className={styles.pillDot} aria-hidden="true" />
            {skill.name}
          </span>
        );
      })}
    </div>
  );
}
