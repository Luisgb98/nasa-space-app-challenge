// components/SolarSystem.js
import React from "react";
import { Line } from "@react-three/drei";

export function Ellipse({ distance, e, segments, color }) {
  const points = [];
  const a = distance;
  const b = a * Math.sqrt(1 - e * e);
  // Generate points for the ellipse
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;

    // Calculate the new x, z position for the planet
    const x = a * Math.cos(theta);
    const z = b * Math.sin(theta);
    points.push([x, 0, z]);
  }

  return (
    <Line
      points={points} // Array of points for the ellipse
      color={color} // Line color
      lineWidth={2} // Line width
      dashed={false} // If dashed is true, it makes a dashed line
    />
  );
}
