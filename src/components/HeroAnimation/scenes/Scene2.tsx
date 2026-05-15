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
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between lg:pl-8 lg:pr-0 px-6 md:px-8 gap-8 md:gap-0"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col z-10 w-full md:w-[42vw] md:max-w-[38vw] text-center md:text-left items-center md:items-start order-2 md:order-1">
        <motion.span
          className="mb-2 md:mb-4 text-[10px] md:text-[1.1vw] uppercase"
          style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', color: BLUE }}
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6 }}
        >
          01 / Web App
        </motion.span>

        <motion.h2
          className="leading-[0.9] uppercase"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif', 
            fontWeight: 700, 
            fontSize: 'clamp(28px, 8vw, 5.5vw)', 
            letterSpacing: '0.04em' 
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
        CON<br className="hidden md:block" />GRADUATION
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ transformOrigin: 'center', backgroundColor: BLUE, height: '1px', width: '30px', marginTop: '16px' }}
          className="md:!origin-left"
        />

        <motion.p
          className="mt-4 md:mt-5 text-[11px] md:text-[1.1vw] leading-relaxed max-w-[280px] md:max-w-none"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Graduation photo platform for students. Designed with 3D character animations and dynamic gradient styling.
        </motion.p>
      </div>

      <motion.div
        className="w-[85%] md:w-[46vw] aspect-video relative rounded-lg overflow-hidden order-1 md:order-2"
        initial={{ opacity: 0, scale: 0.88, rotateY: 20, rotateX: 8 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1, rotateY: -4, rotateX: 3 } : { opacity: 0, scale: 0.88, rotateY: 20, rotateX: 8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d', boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${BLUE_GLOW}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagePath} className="w-full h-full object-cover" alt="Congraduation Project" />
        <div className="absolute inset-0 rounded-lg" style={{ border: `1px solid ${BLUE}33` }} />
      </motion.div>
    </motion.div>
  );
}
