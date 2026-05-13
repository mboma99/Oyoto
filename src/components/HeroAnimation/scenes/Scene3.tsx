'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ORANGE = '#f97316';
const ORANGE_GLOW = 'rgba(249,115,22,0.25)';

interface Props {
  imagePath: string;
}

export function Scene3({ imagePath }: Props) {
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
      style={{ paddingRight: 'clamp(0rem, 8vw, 2rem)' }}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-[40vw] h-[78vh] relative overflow-hidden rounded-lg"
        initial={{ opacity: 0, x: -80, rotateZ: -3 }}
        animate={phase >= 1 ? { opacity: 1, x: 0, rotateZ: 1.5 } : { opacity: 0, x: -80, rotateZ: -3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ boxShadow: `0 32px 64px rgba(0,0,0,0.6), 0 0 60px ${ORANGE_GLOW}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagePath} className="w-full h-full object-cover" alt="Vengcity Project" />
        <div className="absolute inset-0 rounded-lg" style={{ border: `1px solid ${ORANGE}33` }} />
      </motion.div>

      <div className="flex flex-col z-10 max-w-[40vw] text-right items-end">
        <motion.span
          className="mb-4 text-[1.1vw] uppercase"
          style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', color: ORANGE }}
          initial={{ opacity: 0, x: 20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6 }}
        >
          02 / E-Commerce
        </motion.span>

        <motion.h2
          className="leading-none uppercase"
          style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '7vw', letterSpacing: '0.02em', color: ORANGE }}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          VENGCITY
        </motion.h2>

        <div style={{ width: '40px', height: '1px', backgroundColor: ORANGE, marginTop: '24px', marginLeft: 'auto' }} />

        <motion.p
          className="mt-5 text-[1.1vw] leading-relaxed"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          High-energy streetwear storefront with bold kinetic typography and dramatic contrast.
        </motion.p>
      </div>
    </motion.div>
  );
}
