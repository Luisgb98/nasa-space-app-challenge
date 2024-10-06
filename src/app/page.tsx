"use client";

import Widgets from "./components/Widgets";
import { useState } from "react";
import SolarSystem from "./threejs/SolarSystem";
import React from "react";

export interface WidgetParams {
  velocity: number;
  togPlanets: boolean;
}

export default function SolarSystemPage() {
  const [velocity, setVelocity] = useState(5);
  const [togPlanets, setPlanets] = useState(true);
  const params: WidgetParams = {velocity, togPlanets}
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
          togPlanets={togPlanets} setPlanets={setPlanets}/>
        <SolarSystem params={params}/>
      </div>
    </>
  );
}
