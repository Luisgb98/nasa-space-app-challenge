"use client";

import { useEffect, useState } from "react";
import SolarSystem from "./threejs/SolarSystem";
import React from "react";
import Widgets from "./components/Widgets";

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
    togSatellites,
  };

  //   useEffect(() => {
  //     const fetchWidgetConfig = async () => {
  //       const res = await fetch("/api/widget-config");
  //       const result = await res.json();
  //       if (result.status === 200) {
  //         setVelocity(result.data.velocity);
  //         setPlanets(result.data.planets);
  //         setOrbits(result.data.orbits);
  //         setSatellites(result.data.satellites);
  //         setDwarfs(result.data.dwarfs);
  //       }
  //     };

  //     fetchWidgetConfig();
  //   }, []);
  useEffect(() => {
    fetch("/api/widget-config")
      .then((res) => res.json())
      .then((data) => {
        setVelocity(data.data.velocity || 5);
        setPlanets(data.data.planets || true);
        setOrbits(data.data.orbits || true);
        setSatellites(data.data.satellites || true);
        setDwarfs(data.data.dwarfs || true);
      });
  }, []);

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
        <Widgets
          velocity={velocity}
          setVelocity={setVelocity}
          togPlanets={togPlanets}
          setPlanets={setPlanets}
          togOrbits={togOrbits}
          setOrbits={setOrbits}
          togSatellites={togSatellites}
          setSatellites={setSatellites}
          togDwarfs={togDwarfs}
          setDwarfs={setDwarfs}
        />
        <SolarSystem params={params} />
      </div>
    </>
  );
}
