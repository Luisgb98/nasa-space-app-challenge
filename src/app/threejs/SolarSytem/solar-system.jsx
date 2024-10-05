import { Bounds, useBounds } from "@react-three/drei";
import { sun } from "./_helper";
import React from "react";
import { Sun } from "./planets";
import { Sphere } from "./planets";
import { Ellipse } from "./planets/Ellipse";

export const SolarSystem = () => {
  return (
    <>
      {/* Sun */}
      <Bounds fit clip observe margin={2}>
        <SelectToZoom>
          <Sun texture={sun.texture} radius={2} />
          <Sphere
            texture={"./jupiter.jpg"}
            distance={38.9165}
            radius={6.9911}
            speed={0.005}
            e={0.0489}
            tiltY={180}
          />
          <Ellipse
            distance={38.9165}
            e={0.0489}
            segments={100}
            color={"#ffffff"}
          />
          <Sphere
            texture={"./earth.jpg"}
            distance={7.48}
            radius={0.6371}
            speed={0.01}
            e={0.0167}
          />
          <Ellipse
            distance={7.48}
            e={0.0167}
            segments={100}
            color={"#ffffff"}
          />
          {/* <group>
            {planets.map((planet, index) => {
              return (
                <>
                  <Sphere
                    texture={planet.texture}
                    size={planet.radius}
                    position={[planet.distance, 0, 0]}
                  />
                </>
              );
            })}
          </group> */}
        </SelectToZoom>
      </Bounds>
    </>
  );
};

function SelectToZoom({ children }) {
  const api = useBounds();
  return (
    <group
      onClick={(e) => (
        e.stopPropagation(), e.delta <= 4 && api.refresh(e.object).fit()
      )}
      onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
    >
      {children}
    </group>
  );
}
