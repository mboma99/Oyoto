"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PixelHeadline.module.css";

interface Dot {
  x: number;
  y: number;
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  phase: number;
  f1: number;
  f2: number;
  jit: number;
  act: boolean;
}

/** Solid word holds, then a soft left-to-right front dissolves it into drifting dots. */
const HOLD = 2300;
const SWEEP = 2600;

/**
 * Renders `text` as a canvas particle field. The plain text stays in the DOM as the
 * layout box and the pre-hydration / no-JS / reduced-motion fallback; the canvas is
 * overlaid on top of it once built.
 */
export function PixelHeadline({ text }: { text: string }) {
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dotsRef = useRef<Dot[] | null>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);
  const cellRef = useRef(2);
  const dprRef = useRef(1);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !textEl || !wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    const build = () => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;

      const rect = textEl.getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(textEl).fontSize);
      if (!rect.width || !fs) return;

      // pad well past the glyph box so displaced dots never clip at the edges
      const pad = Math.round(fs * 0.55);
      const cssW = rect.width;
      const cssH = fs * 0.9;

      canvas.width = Math.round((cssW + pad * 2) * dpr);
      canvas.height = Math.round((cssH + pad * 2) * dpr);
      canvas.style.width = `${cssW + pad * 2}px`;
      canvas.style.height = `${cssH + pad * 2}px`;

      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const octx = off.getContext("2d");
      if (!octx) return;

      octx.fillStyle = "#fff";
      octx.textBaseline = "middle";
      octx.textAlign = "center";

      let size = fs * dpr;
      const setFont = (v: number) => {
        octx.font = `700 ${v}px "Space Grotesk", sans-serif`;
        if ("letterSpacing" in octx) {
          (octx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
            `${-0.045 * v}px`;
        }
      };

      // fit the drawn word to the width the DOM actually rendered it at
      setFont(size);
      const drawn = octx.measureText(text).width;
      if (drawn > 0) {
        const k = Math.max(0.7, Math.min(1.3, (rect.width * dpr) / drawn));
        size *= k;
        setFont(size);
      }
      octx.fillText(text, canvas.width / 2, canvas.height / 2);

      const cell = Math.max(2, Math.round((fs * dpr) / 62));
      const jitSpread = canvas.width * 0.3 * 0.8;
      const data = octx.getImageData(0, 0, canvas.width, canvas.height).data;
      const dots: Dot[] = [];
      for (let y = 0; y < canvas.height; y += cell) {
        for (let x = 0; x < canvas.width; x += cell) {
          const a = data[((y + (cell >> 1)) * canvas.width + (x + (cell >> 1))) * 4 + 3];
          if (a > 120) {
            dots.push({
              x,
              y,
              cx: x,
              cy: y,
              vx: 0,
              vy: 0,
              phase: Math.random() * Math.PI * 2,
              f1: 0.7 + Math.random() * 0.7,
              f2: 0.6 + Math.random() * 0.8,
              jit: (Math.random() - 0.5) * jitSpread,
              act: false,
            });
          }
        }
      }

      dotsRef.current = dots;
      offRef.current = off;
      cellRef.current = cell;
      setReady(true);
    };

    const tick = (now: number) => {
      if (!runningRef.current) return;
      rafRef.current = requestAnimationFrame(tick);

      const dots = dotsRef.current;
      const off = offRef.current;
      if (!dots || !off) return;

      if (startRef.current === null) startRef.current = now;
      const t = now - startRef.current;
      const cell = cellRef.current;
      const r = Math.max(1, (cell - Math.max(1, cell * 0.28)) / 2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const feather = canvas.width * 0.3;
      const prog = Math.max(0, Math.min(1, (t - HOLD) / SWEEP));
      const front = prog * (canvas.width + feather * 1.2);

      if (prog < 1) {
        ctx.drawImage(off, 0, 0);
        // erase the solid letters behind a soft, wide front — no hard slider edge
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        const g = ctx.createLinearGradient(front - feather, 0, front, 0);
        g.addColorStop(0, "rgba(0,0,0,1)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(Math.max(0, front - feather), 0, feather, canvas.height);
        if (front - feather > 0) {
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, front - feather, canvas.height);
        }
        ctx.restore();
      }

      ctx.fillStyle = "#fff";
      const p = pointerRef.current;
      const radius = canvas.height * 0.22;

      for (let i = 0; i < dots.length; i++) {
        const q = dots[i];
        const dotIn = Math.max(0, Math.min(1, (front - q.x + q.jit) / (feather * 0.9)));
        if (dotIn <= 0) continue;

        if (!q.act) {
          // kicked loose as the front passes — letters fall apart, then hold their shape
          q.act = true;
          q.vx = (Math.random() - 0.5) * cell * 2.4;
          q.vy = (Math.random() - 0.5) * cell * 2.4 + cell * 0.6;
        }

        // living wander around the glyph anchor — loose enough to breathe, tight enough to read
        const idle = cell * 1.5 * dotIn;
        let tx =
          q.x +
          Math.sin(t / (4200 * q.f1) + q.x / 70 + q.phase) * idle +
          Math.sin(t / (2600 * q.f2) + q.phase * 2) * idle * 0.45;
        let ty =
          q.y +
          Math.cos(t / (3600 * q.f2) + q.y / 50 + q.phase) * idle * 0.9 +
          Math.cos(t / (2200 * q.f1) + q.phase) * idle * 0.35;

        if (p) {
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / radius) * radius * 0.34;
            tx += (dx / d) * f;
            ty += (dy / d) * f;
          }
        }

        q.vx += (tx - q.cx) * 0.014;
        q.vy += (ty - q.cy) * 0.014;
        q.vx *= 0.93;
        q.vy *= 0.93;
        q.cx += q.vx;
        q.cy += q.vy;

        ctx.globalAlpha = dotIn * (0.82 + 0.18 * Math.sin(t / 900 + q.phase));
        ctx.beginPath();
        ctx.arc(q.cx + cell / 2, q.cy + cell / 2, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const start = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      runningRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (e.clientX - rect.left) * dprRef.current,
        y: (e.clientY - rect.top) * dprRef.current,
      };
    };
    const onLeave = () => {
      pointerRef.current = null;
    };
    const onResize = () => build();

    build();
    if (document.fonts?.ready) document.fonts.ready.then(build).catch(() => {});

    // don't burn a rAF loop while the headline is scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(wrap);

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelled = true;
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [text]);

  return (
    <span className={styles.wrap} ref={wrapRef}>
      <span
        ref={textRef}
        className={`${styles.text} ${ready ? styles.textHidden : ""}`}
      >
        {text}
      </span>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </span>
  );
}
