'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Background3D } from './Background3D';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCENE_KEYS = ['project1', 'project2', 'project3'] as const;

export function HeroAnimation() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const currentSceneRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const sceneCount = SCENE_KEYS.length;
      const totalSteps = sceneCount - 1;

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalSteps}`,
        pin: true,
        scrub: 0.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            totalSteps,
            Math.max(0, Math.round(self.progress * totalSteps)),
          );

          if (nextIndex !== currentSceneRef.current) {
            currentSceneRef.current = nextIndex;
            setSceneIndex(nextIndex);
          }
        },
      });
    },
    { scope: containerRef },
  );

  const currentSceneKey = SCENE_KEYS[sceneIndex];
  const progressLabel = useMemo(() => `${sceneIndex + 1} / ${SCENE_KEYS.length}`, [sceneIndex]);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center">
      <div
        className="relative mx-auto overflow-hidden text-white border border-white/15 shadow-2xl"
        style={{
          backgroundColor: '#161616',
          width: '100%',
          maxWidth: '100%',
          height: '78vh',
          borderRadius: '30px',
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <Background3D currentScene={sceneIndex + 1} />
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        <motion.div
          className="absolute w-px z-10 origin-top"
          style={{ backgroundColor: '#86A68C', opacity: 0.3 }}
          animate={{
            left: ['50vw', '80vw', '20vw'][sceneIndex],
            height: ['50vh', '100vh', '30vh'][sceneIndex],
          }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        />

        <div
          className="absolute top-8 right-8 z-30 text-xs uppercase tracking-[0.24em] text-white/45"
          style={{ fontFamily: 'Space Mono, monospace' }}
        >
          {progressLabel}
        </div>

        <div className="absolute inset-0 z-20">
          <AnimatePresence mode="popLayout">
            {currentSceneKey === 'project1' && (
              <Scene2 key="project1" imagePath="/hero-images/congraduation.png" />
            )}
            {currentSceneKey === 'project2' && (
              <Scene3 key="project2" imagePath="/hero-images/vengcity.png" />
            )}
            {currentSceneKey === 'project3' && (
              <Scene4
                key="project3"
                imagePath1="/hero-images/unibud.png"
                imagePath2="/hero-images/trakr.png"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
