"use client";

import Widgets from "./components/Widgets";
import { useState } from "react";
import SolarSystem from "./threejs/SolarSystem";
import React from "react";

export interface WidgetParams {
  velocity: number;
  togPlanets: boolean;
  togOrbits: boolean;
  togSatellites: boolean;
  togDwarfs: boolean;
}

export default function SolarSystemPage() {
  const [velocity, setVelocity] = useState(5);
  const [togPlanets, setPlanets] = useState(true);
  const [togOrbits, setOrbits] = useState(true);
  const [togSatellites, setSatellites] = useState(true);
  const [togDwarfs, setDwarfs] = useState(true);
  const params: WidgetParams = {
    velocity,
    togPlanets,
    togOrbits,
    togDwarfs,
    togSatellites
  }
  return (
    <>
      <div
        style={{
          height: "91vh",
          width: "100vw",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Widgets velocity={velocity} setVelocity={setVelocity} 
          togPlanets={togPlanets} setPlanets={setPlanets}
          togOrbits={togOrbits} setOrbits={setOrbits}
          togSatellites={togSatellites} setSatellites= {setSatellites}
          togDwarfs={togDwarfs} setDwarfs={setDwarfs}/>
        <SolarSystem params={params}/>
      </div>
    </>
  );
}
