import { Bounds, useBounds } from "@react-three/drei";
import { sun } from "./_helper";
import React, { useEffect, ReactNode } from "react";
import { Sun } from "./Planets";
import { Sphere } from "./Planets";
import { Ellipse } from "./Planets/Ellipse";
import { Ring } from "./Planets";
import { GetPlanetsDto } from "@/lib/dtos/planets/get/get-planets-dto";

export const PlanetsGroup = () => {
  const [planets, setPlanets] = React.useState<GetPlanetsDto>();
  useEffect(() => {
    fetch("/api/planets")
    .then((res) => res.json())
    .then((data) => setPlanets(data.data));
  }, []);
  console.log(planets);
  
  const saturn = planets?.find((planet)=>planet.name=='Saturn')

  return (
    <React.Fragment>
      <Bounds fit clip observe margin={2}>
        <SelectToZoom>
          <Sun texture={sun.texture} radius={2} />
{/*           <Ring
            texture={'./textures/saturn_ring.jpg'}
            distance={saturn?.scaledDistance}
            speed={0.01}
            e={0.0565}
          /> */}
          <group>
            {planets?.map((planet, index) => {
              return (
                <>
                  <Sphere
                    texture={planet.texture}
                    radius={planet.scaledRadius}
                    distance={planet.scaledDistance}
                    speed={0.01}
                    e={planet.eccentricity}
                    name={planet.name}
                  />
                </>
              );
            })}
          </group>
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
