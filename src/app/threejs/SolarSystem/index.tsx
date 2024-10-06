"use client";

import { useRef } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { PlanetsHandler } from "./PlanetsHandler";
import { OrbitControls } from "@react-three/drei";


const SolarSystem = () => {
  const orbitRef = useRef(null);

  return (
    <Canvas camera={{ position: new Vector3(0, 20, 300) }}>
      <directionalLight position={[10, 10, 5]} intensity={5} />
      <ambientLight intensity={2} />
      <OrbitControls
        ref={orbitRef}
        // enableRotate={false}
        enableZoom={true}
      />
      <PlanetsHandler />
    </Canvas>
  );
};

export default SolarSystem;
