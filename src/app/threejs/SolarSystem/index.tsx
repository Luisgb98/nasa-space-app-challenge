"use client";

import { useRef } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { PlanetsHandler } from "./PlanetsHandler";
import { OrbitControls } from "@react-three/drei";


interface SolarSystemProps {
  velocity: number;
}

const SolarSystem = ({velocity} : SolarSystemProps) => {
  const orbitRef = useRef(null);

  return (
    <Canvas camera={{ position: new Vector3(0, 20, 300) }}>
      <directionalLight position={[10, 10, 5]} intensity={5} />
      <ambientLight intensity={2} />
      <OrbitControls
        ref={orbitRef}
        enableRotate={false}
        enableZoom={true}
      />
      <PlanetsHandler velocity={velocity}/>
    </Canvas>
  );
};

export default SolarSystem;
