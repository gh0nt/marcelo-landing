"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

interface MarceloModelProps {
  [key: string]: unknown;
}

function MarceloModel(props: MarceloModelProps) {
  const { scene } = useGLTF("/Marcelo3D.glb");
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      console.log("Scene loaded:", scene); // Debug log

      // Expecting white texture :c
      const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.55,
        metalness: 0.0,
        emissive: 0x000000,
      });

      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log("Applying white material to mesh:", child.name); // Debug log
          child.material = whiteMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  if (!scene) {
    console.log("Scene not loaded yet");
    return null;
  }

  return (
    <group ref={meshRef} position={[0.3, 0, 0]} {...props}>
      <primitive object={scene} />
    </group>
  );
}

const Marcelo3DViewer = () => (
  <div className="w-full h-80 sm:h-96 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] mx-auto flex items-center justify-center relative">
    <Canvas
      camera={{ position: [0.5, 1, 4], fov: 55 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      shadows
      gl={{
        antialias: true,
        // sombras más suaves para rasgos faciales
        shadowMapType: THREE.PCFSoftShadowMap,
      }}
    >
      {/* 1) KEY LIGHT: alta intensidad desde arriba y atrás */}
      <directionalLight
        position={[-1.5, 6, -3.5]}
        intensity={3.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.00015}
      />

      {/* 2) FILL LEFT: media intensidad lado izquierdo (sin sombra) */}
      <directionalLight position={[-4, 2.5, 2]} intensity={1.2} />

      {/* 3) RIM RIGHT: baja intensidad lado derecho para borde */}
      <pointLight position={[3.2, 1.2, 2.2]} intensity={0.5} />

      <Suspense fallback={null}>
        <MarceloModel scale={2.5} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  </div>
);

export default Marcelo3DViewer;
