/* import { PlanetsSearcher } from "@/app/api/contexts/nasa/planets/application/planets-searcher/planets-searcher";
import { container } from "@/app/inversify.config";
import Canva from "./threejs/SolarSytem/canva"; */
import { Flex } from "@chakra-ui/react";
import Widgets from "./components/Widgets";
import SolarSystemCanvas from "./threejs/SolarSystem";

export default async function SolarSystemPage() {
/*   const planetsSearcher = container.get<PlanetsSearcher>(PlanetsSearcher);
  const planets = await planetsSearcher.search(); */

  return (
    <Flex
      style={{ height: "80vh", width: "100vw", backgroundColor: "#021631" }}
    >
      <Widgets />
      <SolarSystemCanvas />
    </Flex>
  ); 
}
