"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function GoldCore({ reducedMotion }: { reducedMotion: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current || reducedMotion) {
      return;
    }

    mesh.current.rotation.x = clock.elapsedTime * 0.18 + pointer.y * 0.18;
    mesh.current.rotation.y = clock.elapsedTime * 0.28 + pointer.x * 0.28;
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={mesh} position={[0, 0.15, 0]} scale={[1.9, 1.9, 1.9]}>
        <icosahedronGeometry args={[1, 8]} />
        <meshPhysicalMaterial
          color="#d8ad63"
          emissive="#3c2408"
          emissiveIntensity={0.45}
          metalness={0.92}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.25}
          transmission={0.08}
        />
      </mesh>
    </Float>
  );
}

function LightRings({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) {
      return;
    }

    group.current.rotation.z = clock.elapsedTime * 0.08;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.16;
  });

  return (
    <group ref={group}>
      {[1.9, 2.35, 2.82].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2.8 + index * 0.18, index * 0.45, 0]}>
          <torusGeometry args={[radius, 0.006, 12, 160]} />
          <meshBasicMaterial
            color={index === 1 ? "#f5d79a" : "#b9813a"}
            transparent
            opacity={0.28 - index * 0.045}
          />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(220 * 3);

    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 8;
      values[index + 1] = (Math.random() - 0.5) * 5;
      values[index + 2] = (Math.random() - 0.5) * 4;
    }

    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current || reducedMotion) {
      return;
    }

    points.current.rotation.y = clock.elapsedTime * 0.025;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#f3d99f"
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function LuxuryScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[2.8, 2.6, 3.8]} intensity={3.4} color="#f6d58b" />
        <pointLight position={[-3.4, -1.8, 2.4]} intensity={1.8} color="#7a4b18" />
        <GoldCore reducedMotion={reducedMotion} />
        <LightRings reducedMotion={reducedMotion} />
        <ParticleField reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
