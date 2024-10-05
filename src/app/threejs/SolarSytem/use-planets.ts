import { PlanetsSearcher } from "@/app/api/contexts/nasa/planets/application/planets-searcher/planets-searcher";
import { container } from "@/app/inversify.config";

export const usePlanets = async () => {
  console.log("Fetching planets data on the server");
  const planetsSearcher = container.get<PlanetsSearcher>(PlanetsSearcher);
  const planets = await planetsSearcher.search();

  // You can console.log on the server (this will log in the terminal, not the browser console)
  console.log("Fetched planets", planets);
  return planets;
};
