'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PURPLE = '#a855f7';
const TRAKR_RED = '#ef4444';

interface Props {
  imagePath1: string;
  imagePath2: string;
}

export function Scene4({ imagePath1, imagePath2 }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 900),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 1.08, filter: 'blur(16px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.h2
        className="absolute top-[1rem] uppercase"
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: '3.5vw',
          letterSpacing: '0.12em',
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
      >
        MOBILE <span style={{ color: PURPLE }}>EXPERIENCES</span>
      </motion.h2>

      <div className="flex gap-[6vw] items-center mt-[8vh]">
        <motion.div
          className="relative overflow-hidden rounded-[2vw]"
          style={{ width: '12rem', aspectRatio: '9/19', boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 40px rgba(168,85,247,0.2)`, border: `1px solid ${PURPLE}33` }}
          initial={{ opacity: 0, y: 100, rotateZ: -8 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, rotateZ: -4 } : { opacity: 0, y: 100, rotateZ: -8 }}
          transition={{ type: 'spring', damping: 22, stiffness: 120 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagePath1} className="w-full h-full object-cover" alt="UniBud App" />
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-[2vw]"
          style={{ width: '12rem', aspectRatio: '9/19', boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 40px rgba(239,68,68,0.2)`, border: `1px solid ${TRAKR_RED}33` }}
          initial={{ opacity: 0, y: 100, rotateZ: 8 }}
          animate={phase >= 3 ? { opacity: 1, y: 0, rotateZ: 4 } : { opacity: 0, y: 100, rotateZ: 8 }}
          transition={{ type: 'spring', damping: 22, stiffness: 120 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagePath2} className="w-full h-full object-cover" alt="Trakr App" />
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-[8vh] uppercase"
        style={{
          fontFamily: 'Space Mono, monospace',
          letterSpacing: '0.24em',
          fontSize: '1vw',
          color: 'rgba(255,255,255,0.35)',
          paddingInline: 'clamp(2rem, 14vw, 12rem)',
          width: '100%',
          textAlign: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span style={{ color: PURPLE }}>UniBud</span>&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: TRAKR_RED }}>Trakr</span>
      </motion.p>
    </motion.div>
  );
}
