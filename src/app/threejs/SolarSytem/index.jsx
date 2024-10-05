// components/SolarSystem.js
import { Bounds, OrbitControls, useCursor, useBounds } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { planets, sun } from "./_helper";
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export function Sphere({ texture, size, position }) {
  const ref = useRef();
  const planetTexture = useLoader(TextureLoader, texture);
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
  });


  return (
    <mesh
      ref={ref}
      position={position}
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
      <Bounds fit clip observe margin={4}>
        <SelectToZoom>
        <Sphere texture={sun.texture} size={sun.size} position={[0, 0, 0]} />

        <group>
          {planets.map((planet, index) => {
            return (
              <Sphere
                texture={planet.texture}
                size={planet.radius}
                position={[planet.distance, 0, 0]}
              />
            );
          })}

        </group>
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
      /* onPointerMissed={(e) => e.button === 0 && api.refresh().fit()} */
    >
      {children}
    </group>
  );
}