'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const wordVars = {
    hidden: { opacity: 0, y: 60, skewY: 4 },
    visible: { opacity: 1, y: 0, skewY: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-start justify-center px-[10vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.p
        className="mb-8 text-[1vw] uppercase"
        style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', color: '#86A68C' }}
        initial={{ opacity: 0, y: 10 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6 }}
      >
        Selected Works
      </motion.p>

      <div className="overflow-hidden leading-none uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '11vw', letterSpacing: '0.02em' }}>
        <motion.div variants={wordVars} initial="hidden" animate={phase >= 1 ? 'visible' : 'hidden'} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          CRAFTING
        </motion.div>
        <motion.div style={{ color: '#86A68C' }} variants={wordVars} initial="hidden" animate={phase >= 2 ? 'visible' : 'hidden'} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          DIGITAL
        </motion.div>
        <motion.div variants={wordVars} initial="hidden" animate={phase >= 3 ? 'visible' : 'hidden'} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          FUTURES
        </motion.div>
      </div>

      <motion.div
        className="flex items-center gap-6 mt-10"
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-16 h-px" style={{ backgroundColor: '#86A68C' }} />
        <span className="text-[1.1vw] uppercase" style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', color: 'rgba(255,255,255,0.4)' }}>
          2024 — 2025
        </span>
      </motion.div>
    </motion.div>
  );
}
