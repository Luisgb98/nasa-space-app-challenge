"use client";

import { useRef } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { PlanetsGroup } from "./PlanetsGroup";
import { OrbitControls } from "@react-three/drei";


const SolarSystem = () => {
  const orbitRef = useRef(null);

  return (
        <Canvas camera={{ position: new Vector3(0, 20, 0) }}>
          <directionalLight position={[10, 10, 5]} intensity={5} />
          <ambientLight intensity={2} />
          <PlanetsGroup />
          <OrbitControls
            ref={orbitRef}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        </Canvas>

    )
};

export default SolarSystem;
