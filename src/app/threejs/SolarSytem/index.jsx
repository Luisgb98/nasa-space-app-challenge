// components/SolarSystem.js
import { Bounds, OrbitControls, useCursor } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { planets } from "./_helper";
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Line } from '@react-three/drei';

function lookAtPosition() {
  useFrame((state, delta) => {
    state.camera.lookAt(0,0,0);
  })
}

export function Ellipse({ a, b, segments, color}) {
  const points = [];
  
  // Generate points for the ellipse
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * 2 * Math.PI;
    const x = a * Math.cos(t);  // X-axis radius
    const y = b * Math.sin(t);  // Y-axis radius
    const z = 0;               // Flat ellipse in the XY plane
    points.push([x, y, z]);
  }

  return (
    <Line
      points={points}       // Array of points for the ellipse
      color={color}         // Line color
      lineWidth={2}         // Line width
      dashed={false}        // If dashed is true, it makes a dashed line
    />
  );
}

export function Sphere({ texture, size, position }) {
  const ref = useRef();
  useCursor("active");
  const planetTexture = useLoader(TextureLoader, texture);
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });

  const onClick = () => {
    lookAtPosition();
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={
        onClick
      }
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
}


export function SolarSystem({changeCameraPosition}) {

  return (
    <>
      {/* Sun */}
      <Bounds fit clip observe margin={1.2}>
        <Ellipse a={5} b={3} segments={100} color={'red'} />
        {/* <Sphere texture={"./sun.jpg"} size={695.508} position={[0, 0, 0]} /> */}

        {/*<group>
          {planets.map((planet, index) => {
            return (
              <Sphere
                texture={planet.texture}
                size={planet.radius}
                position={[planet.distance, 0, 0]}
              />
            );
})}

        </group>*/}
      </Bounds>
    </>
  );
}

function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}