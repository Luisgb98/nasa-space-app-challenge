"use client";

import { useRef } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { PlanetsGroup } from "./PlanetsGroup";
import { OrbitControls } from "@react-three/drei";


const SolarSystem = ({velocity}) => {
  const orbitRef = useRef(null);

  return (
    <Canvas camera={{ position: new Vector3(0, 10, 20) }}>
      <directionalLight position={[10, 10, 5]} intensity={5} />
      <ambientLight intensity={2} />
      <PlanetsGroup velocity={velocity}/>
      <OrbitControls
        ref={orbitRef}
        enableRotate={false}
        enableZoom={true}
      />
    </Canvas>
  );
};

export default SolarSystem;
