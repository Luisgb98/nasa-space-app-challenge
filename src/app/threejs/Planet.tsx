"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface PlanetProps {
  scene: THREE.Scene;
  radius?: number;
  speed?: number;
  distanceX?: number;
  distanceY?: number;
  distanceZ?: number;
}

const Planet = (
	{ scene,
		radius = 1,
		speed = 1,
		distanceX = 1,
		distanceY = 1,
		distanceZ = 1
 }: PlanetProps) => {
  const PlanetRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    // Create the Planet
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const planet = new THREE.Mesh(geometry, material);
		planet.position.set(distanceX, distanceY, distanceZ);
    scene.add(planet);

    // Store reference to Planet for animation
    PlanetRef.current = planet;

  }, [scene]);

  // Rotate the Planet in each animation frame
  useEffect(() => {
    const animate = () => {
      if (PlanetRef.current) {
        PlanetRef.current.rotation.x += 0.01 * speed;
        PlanetRef.current.rotation.y += 0.01 * speed;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return null; // Planet is added to the scene, no need to render anything directly
};

export default Planet;
