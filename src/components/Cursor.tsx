"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

const INTERACTIVE =
  "a, button, [role='button'], label, select, summary, [data-cursor='hover']";

/*
 * Hollow ring that trails the pointer. Only mounts its behaviour on devices
 * with a fine, hovering pointer; touch keeps the native experience. Grows over
 * interactive elements and shrinks while pressed.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const render = () => {
      const ease = reduced ? 1 : 0.22;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame =
        Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1
          ? requestAnimationFrame(render)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!ring.dataset.visible) {
        x = targetX;
        y = targetY;
        ring.dataset.visible = "true";
      }
      const el = e.target instanceof Element ? e.target : null;
      ring.dataset.hover = el?.closest(INTERACTIVE) ? "true" : "";
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onDown = () => (ring.dataset.down = "true");
    const onUp = () => (ring.dataset.down = "");
    const onLeave = () => (ring.dataset.visible = "");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ringRef} className={styles.cursor} aria-hidden="true">
      <span className={styles.ring} />
    </div>
  );
}
