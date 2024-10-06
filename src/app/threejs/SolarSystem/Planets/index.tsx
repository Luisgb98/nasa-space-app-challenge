// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React from "react";
import { TextureLoader, Vector3 } from "three";

import * as THREE from "three";
import { Html } from "@react-three/drei";
import { GetPlanetDto } from "@/lib/dtos/planets/get/get-planets-dto";
import { GetSatellitesDto } from "@/lib/dtos/satellite/get/get-satellites-dto";
import { Satellite } from "@/app/api/contexts/nasa/satellites/domain/satellite";
import { WidgetParams } from "@/app/page";

interface LabelProps {
  position: [number, number, number];
  text: string;
}

function Label({ position, text }: LabelProps) {
  // const { camera } = useThree();
  //   const [zoom, setZoom] = useState(camera.zoom); // Initialize zoom state

  //   camera.zoom = 2;
  //   useFrame(() => {
  //     if (camera.zoom !== zoom) {
  //       setZoom(camera.zoom); // Update the state when zoom changes
  //     }
  //   });

  // const fontSize = 14 / zoom;

  return (
    <Html position={position} center>
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "8px 12px",
          borderRadius: "12px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          color: "#333",
        }}
      >
        {text}
      </div>
    </Html>
  );
}

interface SunProps {
  texture: string;
  radius: number;
}

interface RingProps {
  texture: string;
  distance: number;
  speed: number;
  e: number;
}

export const Sun = ({ texture, radius }: SunProps) => {
  const planetTexture = useLoader(TextureLoader, texture);
  return (
    <>
      {/*  <Text scale={15} position={[0, radius + 15, 0]}>
        Sun
      </Text> */}
      {/* <mesh>
        <Label position={[0, 0, radius + 30]} text="Sun" />
      </mesh> */}

      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial map={planetTexture} />
      </mesh>
    </>
  );
};

interface SphereProps {
  texture: string;
  distance: number;
  radius: number;
  speed: number;
  e: number;
  name: string;
  rotationspeed: number;
}

export const Sphere = ({
  texture,
  distance,
  radius,
  speed,
  e,
  name,
  rotationspeed,
}: SphereProps) => {
  const ref = useRef<THREE.Mesh | null>(null);
  const planetTexture = useLoader(TextureLoader, texture);
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
    ref.current.rotateOnAxis(
      new Vector3(0, 1, 0).normalize(),
      (0.05 * rotationspeed) / 10000
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
};

export function Ring({ texture, distance, speed, e }: RingProps) {
  const ref = useRef<THREE.Mesh | null>(null);
  const ringTexture = useLoader(TextureLoader, texture);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.set(Math.PI / 2.2, 0, 0);
    ref.current.rotateOnAxis(new Vector3(0, 0, 1).normalize(), 0.05);
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[9, 12.0, 100]} />
      <meshBasicMaterial
        map={ringTexture}
        side={THREE.DoubleSide} // Makes sure the ring is visible from both sides
      />
    </mesh>
  );
}

interface PlanetGroupProps {
  planet: GetPlanetDto;
  velocity: number;
  isPlanetSelected: boolean;
  zoomToView: (
    focusRef: React.RefObject<THREE.Object3D>,
    planet: GetPlanetDto
  ) => void;
  params: WidgetParams;
}

export const PlanetGroup = ({
  planet,
  velocity,
  isPlanetSelected,
  zoomToView,
  params,
}: PlanetGroupProps) => {
  const [satellites, setSatellites] = React.useState<GetSatellitesDto | null>();
  useEffect(() => {
    fetch("/api/satellites")
      .then((res) => res.json())
      .then((data) => setSatellites(data.data));
  }, []);

  const planetSatellites = useMemo(
    () => satellites?.filter((sat) => sat.planet_name == planet.name),
    [satellites, planet.name]
  );

  const ref = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const planetTexture = useLoader(TextureLoader, planet.texture);

  const [theta, setTheta] = useState(0);

  const [clicked, setClicked] = useState(false);
  const distance = planet.scaledDistance + 69.634 * 1.5;
  useFrame((state, delta) => {
    if (!ref.current) return;
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta;

    const a = distance;
    const b = a * Math.sqrt(1 - planet.eccentricity * planet.eccentricity);

    // Increment the angle over time to simulate the orbit
    setTheta((prev) => prev + planet.translationSpeed * velocity * 0.00005);

    // Calculate the new x, z position for the planet
    const x = a * Math.cos(theta);
    const z = b * Math.sin(theta);

    // Update planet's position
    if (!isPlanetSelected) groupRef.current.position.set(x, 0, z);
    ref.current.rotateOnAxis(new Vector3(0, 1, 0).normalize(), 0.05);
  });

  return (
    <group
      ref={groupRef}
      onClick={() => {
        setClicked(!clicked);
        zoomToView(groupRef, planet);
      }}
    >
      {planet.name == "Saturn" && (
        <Ring
          texture={"./textures/saturn_ring.jpg"}
          distance={distance}
          speed={0.005}
          e={0.0565}
        />
      )}
      {planetSatellites && params.togSatellites && (
        <>
          {planetSatellites.map((satellite, index) => {
            return (
              <Sphere
                key={index + "-satellite"}
                texture={satellite.texture}
                distance={satellite.scaledDistance + planet.scaledRadius * 1.5}
                radius={satellite.scaledRadius}
                speed={0.005}
                e={0}
                name={satellite.name}
                rotationspeed={satellite.rotationSpeed}
              />
            );
          })}
        </>
      )}
      {!planet.dwarf && (
        <mesh ref={ref}>
          <sphereGeometry args={[planet.scaledRadius, 16, 16]} />
          <meshStandardMaterial map={planetTexture} />
        </mesh>
      )}
      {planet.dwarf && params.togDwarfs && (
        <mesh ref={ref}>
          <sphereGeometry args={[planet.scaledRadius, 16, 16]} />
          <meshStandardMaterial map={planetTexture} />
        </mesh>
      )}
    </group>
  );
};
