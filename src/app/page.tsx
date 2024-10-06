"use client";

import Widgets from "./components/Widgets";
import { useState } from "react";
import SolarSystem from "./threejs/SolarSystem";
import React from "react";

export default function SolarSystemPage() {
  const [velocity, setVelocity] = useState(5);

  return (
    <>
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <Widgets velocity={velocity} setVelocity={setVelocity} />
        <SolarSystem />
      </div>
    </>
  );
}
