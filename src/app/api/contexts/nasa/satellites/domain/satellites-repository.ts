import { Satellite } from "./satellite";

export abstract class SatellitesRepository {
  abstract create(planet: Satellite): Promise<void>;

  abstract searchAll(): Promise<Satellite[]>;
}
