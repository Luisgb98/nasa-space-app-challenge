'use client'
import { Box } from "@chakra-ui/react";
import Widgets from "./components/Widgets";
import SolarSystemCanvas from "./threejs/SolarSystem";
import { useState } from "react";

/* interface SolarSystemParams {
  velocity: number;
} */

export default function SolarSystemPage() {

  const [velocity, setVelocity] = useState(5)
  return (
    <Box
      height="80vh"
      width="100%"
      overflowY="hidden"
    >
      <Widgets
        velocity={velocity}
        setVelocity={setVelocity}
        />
      <SolarSystemCanvas />
    </Box>
  ); 
}
