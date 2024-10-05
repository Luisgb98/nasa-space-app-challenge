"use client";

import { Canvas } from "@react-three/fiber";
import { Sphere, SolarSystem } from "./threejs/SolarSytem";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

/* function Box({ ...props }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current!.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
} */

export default function Home() {
  const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 20, 10));
  const [lightIntensity, setLightIntensity] = useState(1);
  const orbitRef = useRef();


  // THIS https://codesandbox.io/p/sandbox/ssr-test-8pbw1f?file=%2Fsrc%2FApp.js
  const changeCameraPosition = (newPosition) => {

    console.log(newPosition);
    setLightIntensity(6);
  };


  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "#021631" }}
    >
      <Canvas camera={{ position: cameraPosition }}>
        <directionalLight position={[10, 10, 5]} intensity={lightIntensity} />
        <ambientLight intensity={2} />
        <SolarSystem changeCameraPosition={changeCameraPosition} />
        <OrbitControls ref={orbitRef} />
      </Canvas>
    </div>
  );
}
