import { Planet } from "./planet";

export abstract class PlanetsRepository {
  abstract create(planet: Planet): Promise<void>;

  abstract searchAll(): Promise<Planet[]>;
}
