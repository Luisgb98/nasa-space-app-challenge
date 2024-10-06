'use client'
import { Box, calc } from "@chakra-ui/react";
import Widgets from "./components/Widgets";
import SolarSystemCanvas from "./threejs/SolarSystem";
import { useState } from "react";
import Nav from "./components/Navbar";
import SolarSystem from "./threejs/SolarSystem";


export default function SolarSystemPage() {

  const [velocity, setVelocity] = useState(5);
  const [showPlanets, setShowPlanets] = useState(true)
  const [showOrbits, setShowOrbits] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [showDwarfPlanets, setShowDwarfPlanets] = useState(true)

  return (
    <>
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <Nav />
        <Widgets velocity={velocity} setVelocity={setVelocity} />
        <SolarSystem velocity={velocity} />
      </div>
    </>
  ); 
}
