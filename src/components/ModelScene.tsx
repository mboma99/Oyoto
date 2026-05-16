"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, useGLTF } from "@react-three/drei";
import { LoadingLogo } from "./LoadingLogo";
import {
  ACESFilmicToneMapping,
  Box3,
  DoubleSide,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  Object3D,
  SRGBColorSpace,
  Vector3,
} from "three";

type ModelSceneProps = {
  modelPath: string;
};

function ModelLoader() {
  return (
    <Html center>
      <div style={{ width: "16rem", height: "8rem" }}>
        <LoadingLogo />
      </div>
    </Html>
  );
}

function HeroModel({ modelPath }: ModelSceneProps) {
  const gltf = useGLTF(modelPath);
  const rootRef = useRef<Group>(null);
  const chromeMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        color: "#f1f4ed",
        emissive: "#1d211d",
        emissiveIntensity: 0.08,
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 2.9,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        side: DoubleSide,
      }),
    []
  );

  useEffect(() => {
    return () => chromeMaterial.dispose();
  }, [chromeMaterial]);

// Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fittedModel = useMemo(() => {
    const source = gltf.scene as Object3D | undefined;
    if (!source) return null;

    const clone = source.clone(true) as Group;
    clone.traverse((child) => {
      child.frustumCulled = false;
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = chromeMaterial;
      }
    });

    const box = new Box3().setFromObject(clone);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;

    // Smaller size for mobile
    const targetSize = isMobile ? 1.65 : 2.8;
    const scale = targetSize / maxAxis;

    clone.position.sub(center);

    return { object: clone, scale };
  }, [chromeMaterial, gltf.scene, isMobile]);

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
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.25;
      }}
      shadows
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <hemisphereLight args={["#ffffff", "#101010", 0.75]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 5, 5]} intensity={3.2} color="#ffffff" />
      <directionalLight position={[-3.5, 2, 3]} intensity={1.55} color="#86a68c" />
      <directionalLight position={[0, -4, 4]} intensity={1.1} color="#ffb184" />
      <pointLight position={[0, 1.5, 4]} intensity={1} color="#ffffff" />

      <Suspense fallback={<ModelLoader />}>
        <HeroModel modelPath={modelPath} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/abstract_shape.glb");
