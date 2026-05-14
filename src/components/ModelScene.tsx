"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, Group, Object3D, Vector3 } from "three";

type ModelSceneProps = {
  modelPath: string;
};

function HeroModel({ modelPath }: ModelSceneProps) {
  const gltf = useGLTF(modelPath);
  const rootRef = useRef<Group>(null);

  const fittedModel = useMemo(() => {
    const source = gltf.scene as Object3D | undefined;
    if (!source) return null;

    const clone = source.clone(true) as Group;
    clone.traverse((child) => {
      child.frustumCulled = false;
    });

    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.8;
    const scale = targetSize / maxAxis;

    clone.position.sub(center);

    return { object: clone, scale };
  }, [gltf.scene]);

  useFrame((_, delta) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.y += delta * 0.5;
  });

  if (!fittedModel) return null;

  return (
    <group ref={rootRef} position={[0, -0.1, 0]}>
      <primitive object={fittedModel.object} scale={fittedModel.scale} dispose={null} />
    </group>
  );
}

export default function ModelScene({ modelPath }: ModelSceneProps) {
  useEffect(() => {
    const originalWarn = console.warn;

    console.warn = (...args: unknown[]) => {
      const first = args[0];
      if (
        typeof first === "string" &&
        first.includes("THREE.Clock: This module has been deprecated")
      ) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.35, 6.5], fov: 32, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <hemisphereLight args={["#ffffff", "#101010", 0.95]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={0.9} color="#86a68c" />
      <pointLight position={[0, -1.5, 3.5]} intensity={0.5} color="#86a68c" />

      <Suspense fallback={null}>
        <HeroModel modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/abstract_shape.glb");
