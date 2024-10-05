"use client";

import { useRef } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { SolarSystem } from "./threejs/SolarSytem";
import { OrbitControls } from "@react-three/drei";

export default function Home() {

  const orbitRef = useRef();


  // THIS https://codesandbox.io/p/sandbox/ssr-test-8pbw1f?file=%2Fsrc%2FApp.js

  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "#021631" }}
    >
      <Canvas camera={{ position: new Vector3(0, 20, 10) }}>
        <directionalLight position={[10, 10, 5]} intensity={5} />
        <ambientLight intensity={2} />
        <SolarSystem />
        <OrbitControls
          ref={orbitRef}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
