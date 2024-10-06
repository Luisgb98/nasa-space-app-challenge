"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useRef, useState } from "react";
import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { PlanetsHandler } from "./PlanetsHandler";
import { OrbitControls } from "@react-three/drei";
import { WidgetParams } from "@/app/page";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  GetPlanetDto,
  GetPlanetsDto,
} from "@/lib/dtos/planets/get/get-planets-dto";

interface SolarSystemProps {
  params: WidgetParams;
}

const SolarSystem = ({ params }: SolarSystemProps) => {
  const orbitRef = useRef(null);
  const [planetSelected, setPlanetSelected] = useState<GetPlanetDto | null>(
    null
  );

  return (
    <>
      {planetSelected && (
        <Box
          position="absolute"
          top={{ base: "200px", md: "130px" }}
          left="30px"
          zIndex={1}
          bgColor="RGB(255, 255, 255, 0.7)"
          width={{ base: "90vw", md: "500px" }}
          borderRadius="15px"
          p={5}
        >
          <Flex justifyContent="space-between">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="900">
              {planetSelected?.name}
            </Text>
            <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600">
              Type: {planetSelected?.dwarf ? "Dwarf Planet" : "Planet"}
            </Text>
          </Flex>
          <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600">
            Radius: {planetSelected?.actualRadius} km
          </Text>
          <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600">
            Actual distance from sun: {planetSelected?.actualDistanceFromSun} km
          </Text>
          <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600">
            Axis rotation speed: {planetSelected?.rotationSpeed} km/h
          </Text>
          <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="600">
            Velocity around the orbit: {planetSelected?.translationSpeed} km/h
          </Text>
        </Box>
      )}

      {!planetSelected && (
        <Box
          position="absolute"
          top={{ base: "200px", md: "130px" }}
          left="30px"
          zIndex={1}
          bgColor="RGB(255, 255, 255, 0.8)"
          borderRadius="15px"
          width={{ base: "90vw", md: "auto" }}
          p={5}
        >
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="900">
            Click on a planet to find out more about it!
          </Text>
        </Box>
      )}

      <Canvas camera={{ position: new Vector3(0, 30, 50) }}>
        <directionalLight position={[10, 10, 5]} intensity={4} />
        <ambientLight intensity={2} />
        <OrbitControls ref={orbitRef} enableRotate={false} enableZoom={true} />
        <PlanetsHandler
          params={params}
          planetSelected={planetSelected}
          setPlanetSelected={setPlanetSelected}
        />
      </Canvas>
    </>
  );
};

export default SolarSystem;
