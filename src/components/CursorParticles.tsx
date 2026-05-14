"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

export function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.lastX = mouse.current.x;
      mouse.current.lastY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Spawn particles
      for (let i = 0; i < 2; i++) {
        const dx = mouse.current.x - mouse.current.lastX;
        const dy = mouse.current.y - mouse.current.lastY;
        
        particles.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          vx: dx * 0.2 + (Math.random() - 0.5) * 1,
          vy: dy * 0.2 + (Math.random() - 0.5) * 1,
          size: Math.random() * 4 + 2,
          life: 1.0,
          maxLife: 1.0,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        
        // Water-like flow physics
        p.vx += Math.sin(p.life * 10) * 0.05; // Wavering
        p.vy += 0.02; // Slight gravity/settling
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const opacity = p.life;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 5,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
