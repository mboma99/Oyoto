'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#161616' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(16px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ width: '38vw', height: '38vw', border: '1px solid rgba(134,166,140,0.15)' }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1.6, opacity: 0 } : { scale: 0.4, opacity: 0.6 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
      />

      <motion.div
        className="text-center uppercase leading-none"
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '10vw', letterSpacing: '0.04em' }}
        initial={{ opacity: 0, y: 50 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        LET&apos;S<br />
        <span style={{ color: '#86A68C' }}>BUILD.</span>
      </motion.div>

      <motion.div
        className="mt-10 uppercase"
        style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', fontSize: '1.1vw', color: 'rgba(255,255,255,0.35)' }}
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        Your Next Project Awaits
      </motion.div>
    </motion.div>
  );
}
