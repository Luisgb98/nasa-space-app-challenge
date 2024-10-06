import { Bounds, useBounds } from "@react-three/drei";
import { sun } from "./_helper";
import React, { useEffect, ReactNode } from "react";
import { Sun } from "./Planets";
import { Sphere } from "./Planets";
import { Ellipse } from "./Planets/Ellipse";
import { Ring } from "./Planets";
import { GetPlanetsDto } from "@/lib/dtos/planets/get/get-planets-dto";
import { Text } from "@chakra-ui/react";

export const PlanetsGroup = ({velocity}) => {
  const [planets, setPlanets] = React.useState<GetPlanetsDto>();
  useEffect(() => {
    fetch("/api/planets")
    .then((res) => res.json())
    .then((data) => setPlanets(data.data));
  }, []);
  console.log(planets);
  
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
                  speed={planet.translationSpeed * velocity * 0.00005}
                  e={planet.eccentricity}
                  name={planet.name}
                  rotationspeed={planet.rotationSpeed}
                />
                {
                  <Ellipse
                    key={index + "-ellipse"}
                    distance={planet.scaledDistance + (sun.radius * 1.5)}
                    e={planet.eccentricity}
                    color="white"
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
