import { Bounds, useBounds } from "@react-three/drei";
import { sun } from "./_helper";
import React, { useEffect, ReactNode } from "react";
import { Sun } from "./Planets";
import { Sphere } from "./Planets";
import { Ellipse } from "./Planets/Ellipse";
import { GetPlanetsDto } from "@/lib/dtos/planets/get/get-planets-dto";
import { Text } from "@chakra-ui/react";

export const PlanetsGroup = () => {
  const [planets, setPlanets] = React.useState<GetPlanetsDto>();
  useEffect(() => {
    fetch("/api/planets")
    .then((res) => res.json())
    .then((data) => setPlanets(data.data));
  }, []);
  
  return (
    <Bounds fit clip observe margin={2}>
      <SelectToZoom>
        <Sun texture={sun.texture} radius={sun.radius} />
        <group>
          {planets?.map((planet, index) => {
            return (
              <>
                <Sphere
                  key={index + "-planet"}
                  texture={planet.texture}
                  radius={planet.scaledRadius}
                  distance={planet.scaledDistance + (sun.radius * 1.5)}
                  speed={0.01}
                  e={planet.eccentricity}
                />
                {
                  <Ellipse
                    key={index + "-ellipse"}
                    distance={planet.scaledDistance + (sun.radius * 1.5)}
                    e={planet.eccentricity}
                    color={"white"}
                  />
                }
              </>
            );
          })}
        </group>
      </SelectToZoom>
    </Bounds>
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
