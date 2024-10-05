import { Bounds, useBounds } from "@react-three/drei";
import { sun } from "./_helper";
import React, { useEffect, ReactNode } from "react";
import { Sun } from "./Planets";
import { Sphere } from "./Planets";
import { Ellipse } from "./Planets/Ellipse";
import { GetPlanetsDto } from "@/lib/dtos/planets/get/get-planets-dto";

export const PlanetsGroup = () => {
  const [planets, setPlanets] = React.useState<GetPlanetsDto>();
  useEffect(() => {
    fetch("/api/planets")
      .then((res) => res.json())
      .then((data) => setPlanets(data.data));
  }, []);

  return (
    <React.Fragment>
      <Bounds fit clip observe margin={2}>
        <SelectToZoom>
          <Sun texture={sun.texture} radius={2} />
          <Sphere
            texture={"./textures/planets/jupiter.jpg"}
            distance={38.9165}
            radius={6.9911}
            speed={0.005}
            e={0.0489}
          />
          <Ellipse
            distance={38.9165}
            e={0.0489}
            segments={100}
            color={"#ffffff"}
          />
          <Sphere
            texture={"./textures/planets/earth.jpg"}
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
    </React.Fragment>
  );
};

function SelectToZoom({ children }: { children: ReactNode }) {
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
