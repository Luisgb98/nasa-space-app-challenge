// components/SolarSystem.js
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";


export const Sun = ({ texture, radius }) => {
  const ref = useRef();
  const planetTexture = useLoader(TextureLoader, texture);
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
}

export const Sphere = ({ texture, distance, radius, speed, e }) => {
  const ref = useRef();
  const planetTexture = useLoader(TextureLoader, texture);
  /*   const tiltYRad = degrees_to_radians(tiltY); */
  const [theta, setTheta] = useState(0);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta;

    const a = distance;
    const b = a * Math.sqrt(1 - e * e);

    // Increment the angle over time to simulate the orbit
    setTheta((prev) => prev + speed);

    // Calculate the new x, z position for the planet
    const x = a * Math.cos(theta);
    const z = b * Math.sin(theta);

    // Update planet's position
    ref.current.position.set(x, 0, z);
    ref.current.rotateOnAxis(new Vector3(0, 1, 0).normalize(), 0.05);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
}
