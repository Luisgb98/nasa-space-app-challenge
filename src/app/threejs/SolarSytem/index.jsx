// components/SolarSystem.js
import { Bounds, OrbitControls, useCursor, useBounds } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { planets, sun } from "./_helper";
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Line } from "@react-three/drei";

export function Ellipse({ a, e, segments, color, scaleFactor }) {
  const points = [];
  // Generate points for the ellipse
  for (let i = 0; i <= segments; i++) {
    const b = a * Math.sqrt(1 - e * e); // Semi-minor axis
    const t = (i / segments) * 2 * Math.PI;
    const x = scaleFactor * a * Math.cos(t); // X-axis radius
    const y = scaleFactor * b * Math.sin(t); // Y-axis radius
    const z = -1; // Flat ellipse in the XY plane
    points.push([x, y, z]);
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



export function Sphere({ texture, distance, radius, speed, e }) {
  const ref = useRef();
  const planetTexture = useLoader(TextureLoader, texture);

  const [theta, setTheta] = useState(0);


  useFrame((state, delta) => {
    ref.current.rotation.x += delta;

     const a = distance;
     const b = a * Math.sqrt(1 - e * e);

     // Increment the angle over time to simulate the orbit
     setTheta((prev) => prev + speed);

     // Calculate the new x, z position for the planet
     const x = a * Math.cos(theta);
     const z = b * Math.sin(theta);

     // Update planet's position
     ref.current.position.set(x, 0, z);
  });


  return (
    <mesh
      ref={ref}
    >
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
}


export function SolarSystem({changeCameraPosition}) {

  return (
    <>
      {/* Sun */}
      <Bounds fit clip observe margin={2}>
        <SelectToZoom>
          {/* <Sphere texture={sun.texture} size={sun.radius} position={[0, 0, 0]} /> */}
          {/*           <Ellipse
            a={5.2}
            e={0.0489}
            segments={100}
            color="white"
            scaleFactor={7.8}
          /> */}
          <Sphere
            texture={"./jupiter.jpg"}
            distance={38.9165}
            radius={6.9911}
            speed={0.01}
            e={0.0489}
          />
          {/* <group>
            {planets.map((planet, index) => {
              return (
                <>
                  <Sphere
                    texture={planet.texture}
                    size={planet.radius}
                    position={[planet.distance, 0, 0]}
                  />
                </>
              );
            })}
          </group> */}
        </SelectToZoom>
      </Bounds>
    </>
  );
}

function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 4 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()} 
    >
      {children}
    </group>
  );
}