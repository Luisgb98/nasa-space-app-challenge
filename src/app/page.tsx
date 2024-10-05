import { PlanetsSearcher } from "@/app/api/contexts/nasa/planets/application/planets-searcher/planets-searcher";
import { container } from "@/app/inversify.config";
import Canva from "./threejs/SolarSytem/canva";

export default async function SolarSystemPage() {
  const planetsSearcher = container.get<PlanetsSearcher>(PlanetsSearcher);
  const planets = await planetsSearcher.search();

  return <Canva planets={planets} />;
}
