"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function HeartShape() {
  const heartRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      heartRef.current.rotation.z =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      heartRef.current.position.y =
        Math.sin(state.clock.getElapsedTime()) * 0.1;
    }

    if (materialRef.current) {
      // Pulse effect on the material
      materialRef.current.emissiveIntensity =
        0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
    }
  });

  // Create a heart shape
  const heartShape = new THREE.Shape();

  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -1, -1, -1.5, -2, -1.5);
  heartShape.bezierCurveTo(-4, -1.5, -4, 1, -4, 1);
  heartShape.bezierCurveTo(-4, 3, -2, 4.5, 0, 6);
  heartShape.bezierCurveTo(2, 4.5, 4, 3, 4, 1);
  heartShape.bezierCurveTo(4, 1, 4, -1.5, 2, -1.5);
  heartShape.bezierCurveTo(1, -1.5, 0, -1, 0, 0);

  const extrudeSettings = {
    depth: 1,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.5,
    bevelThickness: 0.5,
  };

  return (
    <mesh ref={heartRef} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#ff3366"
        roughness={0.2}
        metalness={0.8}
        emissive="#8a2be2"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function HeartModel() {
  return (
    <div className="w-64 h-64 rotate-180">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <HeartShape />
        <Environment preset="sunset" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
