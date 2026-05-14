'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const BLUE = '#6366f1';
const BLUE_GLOW = 'rgba(99,102,241,0.25)';

interface Props {
  imagePath: string;
}

export function Scene2({ imagePath }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between"
      style={{ paddingLeft: 'clamp(1rem, 8vw, 2rem)', paddingRight: 0 }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col z-10 max-w-[38vw]">
        <motion.span
          className="mb-4 text-[1.1vw] uppercase"
          style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', color: BLUE }}
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
        >
          01 / Web App
        </motion.span>

        <motion.h2
          className="leading-none uppercase"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '5.5vw', letterSpacing: '0.04em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
        CON
        GRADUATION
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ transformOrigin: 'left', backgroundColor: BLUE, height: '1px', width: '40px', marginTop: '24px' }}
        />

        <motion.p
          className="mt-5 text-[1.1vw] leading-relaxed"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Graduation photo platform for students. Designed with 3D character animations and dynamic gradient styling.
        </motion.p>
      </div>

      <motion.div
        className="w-[46vw] aspect-video relative rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.88, rotateY: 20, rotateX: 8 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1, rotateY: -4, rotateX: 3 } : { opacity: 0, scale: 0.88, rotateY: 20, rotateX: 8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d', boxShadow: `0 32px 64px rgba(0,0,0,0.6), 0 0 60px ${BLUE_GLOW}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagePath} className="w-full h-full object-cover" alt="Congraduation Project" />
        <div className="absolute inset-0 rounded-lg" style={{ border: `1px solid ${BLUE}33` }} />
      </motion.div>
    </motion.div>
  );
}
