import { Bounds, useBounds } from "@react-three/drei";
import * as THREE from 'three';
import { sun } from "./_helper";
import React, { useEffect, ReactNode, useState } from "react";
import { PlanetGroup, Sun } from "./Planets";
import { Sphere } from "./Planets";
import { Ellipse } from "./Planets/Ellipse";
import { Ring } from "./Planets";
import { GetPlanetDto, GetPlanetsDto } from "@/lib/dtos/planets/get/get-planets-dto";
import { Text } from "@chakra-ui/react";
import { useFrame } from "@react-three/fiber";
import { Planet } from "@/app/api/contexts/nasa/planets/domain/planet";



export const PlanetsHandler = () => {
  const [planets, setPlanets] = React.useState<GetPlanetsDto>();
  useEffect(() => {
    fetch("/api/planets")
    .then((res) => res.json())
    .then((data) => setPlanets(data.data));
  }, []);
  
  const [planetSelected, setPlanetSelected] = useState<GetPlanetDto | null>(null);
  const [focus, setFocus] = useState<THREE.Vector3>(new THREE.Vector3(0, 20, 300));
  const vec = new THREE.Vector3(0, 20, 300);
  useFrame((state) => {
    const step = 0.05;
    console.log(state.camera.position);
    /*
      Need to find some way to lerp the lookAt
      */

    planetSelected ? vec.set(focus.x, focus.y, focus.z +11) : vec.set(0, 20, 30);
    //
    state.camera.position.lerp(vec, step);
    state.camera.lookAt(0, 0, 0);
    // Update to new position/lookAt
    state.camera.updateProjectionMatrix();
  });
  
  const zoomToView = (focusRef: React.RefObject<THREE.Object3D>, planet: GetPlanetDto) => {
    console.log("zoomToView");
    setPlanetSelected(planet);
    if (!focusRef.current) return
    setFocus(focusRef.current.position);
    console.log(focusRef.current.position);
  };

  return (
    <Bounds fit clip observe margin={1}>
      <Sun texture={sun.texture} radius={sun.radius} />
      <group>
        {planets?.map((planet, index) => {
          return (
            <>
              <PlanetGroup
                key={index + "-planet"}
                planet={planet}
                zoomToView={zoomToView}
              />
              {
                <Ellipse
                  key={index + "-ellipse"}
                  distance={planet.scaledDistance + (sun.radius * 1.5)}
                  e={planet.eccentricity}
                  color="white"
                />
              }
            </>
          );
        })}
      </group>

    </Bounds>
  );
};


