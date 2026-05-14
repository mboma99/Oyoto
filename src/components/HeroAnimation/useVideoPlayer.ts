'use client';

import { useState, useEffect, useRef } from 'react';

export interface UseVideoPlayerOptions {
  durations: Record<string, number>;
  loop?: boolean;
}

export function useVideoPlayer({ durations, loop = true }: UseVideoPlayerOptions) {
  const sceneKeys = useRef(Object.keys(durations)).current;
  const durationsArray = useRef(Object.values(durations)).current;
  const totalScenes = sceneKeys.length;

  const [currentScene, setCurrentScene] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    if (hasEnded && !loop) return;

    const timer = setTimeout(() => {
      if (currentScene >= totalScenes - 1) {
        setHasEnded(true);
        if (loop) setCurrentScene(0);
      } else {
        setCurrentScene(prev => prev + 1);
      }
    }, durationsArray[currentScene]);

    return () => clearTimeout(timer);
  }, [currentScene, totalScenes, durationsArray, hasEnded, loop]);

  return {
    currentScene,
    totalScenes,
    currentSceneKey: sceneKeys[currentScene],
    hasEnded,
  };
}
