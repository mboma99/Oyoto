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
      className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-8 gap-6 md:gap-0"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-[70%] md:w-[40vw] aspect-[3/4] md:h-[78vh] relative overflow-hidden rounded-lg order-1"
        initial={{ opacity: 0, x: -80, rotateZ: -3 }}
        animate={phase >= 1 ? { opacity: 1, x: 0, rotateZ: 1.5 } : { opacity: 0, x: -80, rotateZ: -3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${ORANGE_GLOW}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagePath} className="w-full h-full object-cover" alt="Vengcity Project" />
        <div className="absolute inset-0 rounded-lg" style={{ border: `1px solid ${ORANGE}33` }} />
      </motion.div>

      <div className="flex flex-col z-10 w-full md:w-[42vw] md:max-w-[40vw] text-center md:text-right items-center md:items-end order-2">
        <motion.span
          className="mb-2 md:mb-4 text-[10px] md:text-[1.1vw] uppercase"
          style={{ fontFamily: 'Space Mono, monospace', letterSpacing: '0.24em', color: ORANGE }}
          initial={{ opacity: 0, x: 20 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6 }}
        >
          02 / E-Commerce
        </motion.span>

        <motion.h2
          className="leading-[0.9] uppercase"
          style={{ 
            fontFamily: 'Space Grotesk, sans-serif', 
            fontWeight: 700, 
            fontSize: 'clamp(28px, 10vw, 7vw)', 
            letterSpacing: '0.02em', 
            color: ORANGE 
          }}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          VENG<br className="hidden md:block" />CITY
        </motion.h2>

        <div style={{ width: '30px', height: '1px', backgroundColor: ORANGE, marginTop: '16px' }} className="md:ml-auto" />

        <motion.p
          className="mt-4 md:mt-5 text-[11px] md:text-[1.1vw] leading-relaxed max-w-[280px] md:max-w-none"
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
