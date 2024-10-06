import { Bounds, useBounds } from "@react-three/drei";
import * as THREE from "three";
import { sun } from "./_helper";
import React, { useEffect, ReactNode, useState } from "react";
import { PlanetGroup, Sun } from "./Planets";
import { Sphere } from "./Planets";
import { Ellipse } from "./Planets/Ellipse";
import { Ring } from "./Planets";
import {
  GetPlanetDto,
  GetPlanetsDto,
} from "@/lib/dtos/planets/get/get-planets-dto";
import { Text } from "@chakra-ui/react";
import { useFrame, useThree } from "@react-three/fiber";
import { Planet } from "@/app/api/contexts/nasa/planets/domain/planet";
import { WidgetParams } from "@/app/page";

interface PlanetsHandlerProps {
  params: WidgetParams;
  planetSelected: GetPlanetDto | null;
  setPlanetSelected: React.Dispatch<React.SetStateAction<GetPlanetDto | null>>;
}

export const PlanetsHandler = ({ params, planetSelected, setPlanetSelected }: PlanetsHandlerProps) => {
  const [planets, setPlanets] = React.useState<GetPlanetsDto>();

  const { camera } = useThree();
  useEffect(() => {
    fetch("/api/planets")
      .then((res) => res.json())
      .then((data) => setPlanets(data.data));
  }, []);

  const [focus, setFocus] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 30, 50)
  );
  const [cameraLookAt, setCameraLookAt] = useState<THREE.Vector3>(
    new THREE.Vector3(0, 0, 0)
  ); // To control where the camera looks
  const vec = new THREE.Vector3();
  const lookVec = new THREE.Vector3();

  useFrame((state) => {
    const step = 0.05;

    if (planetSelected && focus) {
      // Adjust camera position and lookAt dynamically when a planet is selected
      vec.set(focus.x, focus.y + 3, focus.z + planetSelected.scaledRadius * 4);
      lookVec.set(focus.x, focus.y, focus.z); // Look at the selected planet
    } else {
      // Default camera position and lookAt when no planet is selected
       vec.copy(state.camera.position);
      lookVec.set(0, 0, 0);
    }

    // Smoothly move the camera position and update where it looks
    state.camera.position.lerp(vec, step);
    state.camera.lookAt(lookVec);

    // Ensure camera is updated with new positions
    state.camera.updateProjectionMatrix();
  });

const zoomToView = (
  focusRef: React.RefObject<THREE.Object3D>,
  planet: GetPlanetDto
) => {
  if (!focusRef.current) return;
  if (planetSelected && planetSelected.name === planet.name) {
    setPlanetSelected(null); // Unset the planet selection
    setFocus(new THREE.Vector3(0, 30, 50)); // Reset the focus
  } else {
    // Otherwise, select the new planet and zoom to its position
    setPlanetSelected(planet);
    setFocus(focusRef.current.position.clone()); // Update focus position
  }
};

  return (
    <Bounds fit clip observe margin={5}>
      <Sun texture={sun.texture} radius={sun.radius} />
      <group>
        {planets?.map((planet, index) => {
          const isPlanetSelected =
            planetSelected?.name == planet.name ? true : false;
          return (
            <>
              {params.togPlanets && (
                <PlanetGroup
                  key={index + "-planet"}
                  planet={planet}
                  velocity={params.velocity}
                  zoomToView={zoomToView}
                  isPlanetSelected={isPlanetSelected}
                  params={params}
                />
              )}
              {
                params.togOrbits && (
                <Ellipse
                  key={index + "-ellipse"}
                  distance={planet.scaledDistance + sun.radius * 1.5}
                  e={planet.eccentricity}
                  color={planet.dwarf ? "#7E60BF" : "#229799"}
                />
            )}
            </>
          );
        })}
      </group>
    </Bounds>
  );
};
