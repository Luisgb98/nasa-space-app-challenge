// components/SolarSystem.js
import React from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface EllipseProps {
  distance: number;
  e: number;
  color: string;
}

export function Ellipse({ distance, e, color }: EllipseProps) {
  const points: THREE.Vector3[] = []
  const a = distance;
  const b = a * Math.sqrt(1 - e * e);
  // Generate points for the ellipse
  for (let i = 0; i <= 100; i++) {
    const theta = (i / 100) * 2 * Math.PI;

    // Calculate the new x, z position for the planet
    const x = a * Math.cos(theta);
    const z = b * Math.sin(theta);
    points.push(new THREE.Vector3(x, 0, z));
  }

  return (
    <Line
      points={points} // Array of points for the ellipse
      color={color} // Line color
      lineWidth={1} // Line width
      dashed={false} // If dashed is true, it makes a dashed line
    />
  );
}
