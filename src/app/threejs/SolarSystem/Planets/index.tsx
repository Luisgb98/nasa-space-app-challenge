// components/SolarSystem.js
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, Vector3 } from "three";
import * as THREE from "three";


interface SunProps {
  texture: string;
  radius: number;
}

export const Sun = ({ texture, radius }: SunProps) => {
  const planetTexture = useLoader(TextureLoader, texture);
  return (
    <mesh>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
}

interface SphereProps {
  texture: string;
  distance: number;
  radius: number;
  speed: number;
  e: number;
  name: string;
}


export const Sphere = ({ texture, distance, radius, speed, e, name }: SphereProps) => {
  const ref = useRef<THREE.Mesh | null>(null);
  const planetTexture = useLoader(TextureLoader, texture);
  /*   const tiltYRad = degrees_to_radians(tiltY); */
  const [theta, setTheta] = useState(0);

  useFrame((state, delta) => {
    if (!ref.current) return;
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
    <>
      {
        (name == 'Saturn') && 
        <Ring 
            texture={'./textures/saturn_ring.jpg'}
            distance={distance}
            speed={0.01}
            e={0.0565}
        />
      }
      <mesh ref={ref}>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>
    </>
  );
}

export function Ring({texture, distance, speed, e }: RingProps) {
  const ref = useRef<THREE.Mesh | null>(null);
  const ringTexture = useLoader(TextureLoader, texture);
  /*   const tiltYRad = degrees_to_radians(tiltY); */
  const [theta, setTheta] = useState(0);
 
  useFrame((state, delta) => {
    if (!ref.current) return;
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
    ref.current.rotation.set(Math.PI / 2.2, 0 ,0)
    ref.current.rotateOnAxis(new Vector3(0, 0, 1).normalize(), 0.05);
  });


  return (
    <mesh ref={ref} >
      <ringGeometry args={[9, 12.0, 100]} />
      <meshBasicMaterial
        map={ringTexture}
        side={THREE.DoubleSide} // Makes sure the ring is visible from both sides
      />
    </mesh>
  );
}