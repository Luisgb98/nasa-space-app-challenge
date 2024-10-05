// components/SolarSystem.js
import { Bounds, OrbitControls, useCursor } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { planets } from "./_helper";
import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function lookAtPosition() {
  useFrame((state, delta) => {
    state.camera.lookAt(0,0,0);
  })
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
        <Sphere texture={"./sun.jpg"} size={10232} position={[0, 0, 0]} />

        <group>
          {planets.map((planet, index) => {
            return (
              <Sphere
                texture={planet.texture}
                size={planet.radius / 1000}
                position={[planet.distance, 0, 0]}
              />
            );
          })}
          {/* Earth */}
          {/*  <Sphere color="blue" size={1} position={[10, 0, 0]} /> */}

          {/* Moon */}
          {/* <Sphere color="gray" size={0.27} position={[12, 0, 0]} /> */}
        </group>
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