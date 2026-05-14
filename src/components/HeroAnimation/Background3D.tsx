'use client';

import { motion } from 'framer-motion';

interface Background3DProps {
  currentScene: number;
}

const sceneConfigs = [
  { color1: '#161616', color2: '#1c1c1c', accent: '#86A68C', orbX: '50%', orbY: '50%', orbScale: 2.2, rotateZ: 0 },
  { color1: '#0d1124', color2: '#141c3a', accent: '#6366f1', orbX: '68%', orbY: '28%', orbScale: 1.6, rotateZ: 15 },
  { color1: '#1a0a00', color2: '#271200', accent: '#f97316', orbX: '28%', orbY: '62%', orbScale: 2.0, rotateZ: -10 },
  { color1: '#120820', color2: '#1c0c30', accent: '#a855f7', orbX: '58%', orbY: '68%', orbScale: 1.7, rotateZ: 8 },
  { color1: '#161616', color2: '#161616', accent: '#86A68C', orbX: '50%', orbY: '45%', orbScale: 2.5, rotateZ: 0 },
];

const SHAPES = [
  { size: 320, delay: 0, duration: 18, x: '15%', y: '20%' },
  { size: 240, delay: 3, duration: 22, x: '70%', y: '65%' },
  { size: 180, delay: 6, duration: 15, x: '45%', y: '80%' },
  { size: 400, delay: 1, duration: 25, x: '80%', y: '15%' },
  { size: 150, delay: 8, duration: 20, x: '10%', y: '70%' },
];

export function Background3D({ currentScene }: Background3DProps) {
  const cfg = sceneConfigs[currentScene % sceneConfigs.length];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1200px' }}>
      <motion.div
        className="absolute inset-0"
        animate={{ background: `radial-gradient(ellipse at ${cfg.orbX} ${cfg.orbY}, ${cfg.color2} 0%, ${cfg.color1} 70%)` }}
        transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        animate={{ left: cfg.orbX, top: cfg.orbY, scale: cfg.orbScale, backgroundColor: cfg.accent, opacity: 0.12 }}
        transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
        style={{ width: 400, height: 400, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="absolute rounded-full blur-2xl pointer-events-none"
        animate={{ left: `calc(100% - ${cfg.orbX})`, top: `calc(100% - ${cfg.orbY})`, scale: cfg.orbScale * 0.5, backgroundColor: cfg.accent, opacity: 0.06 }}
        transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
        style={{ width: 300, height: 300, translateX: '-50%', translateY: '-50%' }}
      />
      {SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: shape.x, top: shape.y, width: shape.size, height: shape.size, translateX: '-50%', translateY: '-50%', transformStyle: 'preserve-3d' }}
          animate={{ rotateX: [0, 30, -20, 10, 0], rotateY: [0, -40, 20, -15, 0], rotateZ: cfg.rotateZ + i * 12, opacity: [0.04, 0.09, 0.05, 0.08, 0.04] }}
          transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{ width: '100%', height: '100%', border: `1px solid ${cfg.accent}`, borderRadius: i % 2 === 0 ? '50%' : '8px', opacity: 0.5 }} />
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.025, 0.055, 0.025] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ backgroundImage: `linear-gradient(${cfg.accent}18 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent}18 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
      />
    </div>
  );
}
