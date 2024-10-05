import { injectable } from "inversify";

import { PlanetsRepository } from "../../domain/planets-repository";
import { Planet } from "../../domain/planet";
import { db } from "@/app/api/contexts/kernel/infrastructure/kysely/nasa-db";

@injectable()
export class KyselyUPlanetRepository implements PlanetsRepository {
  async create(planetData: Planet): Promise<void> {
    try {
      const primitiveValues = {
        ...planetData.toPrimitives(),
        id: undefined,
      };

      const created = await db
        .insertInto("planets")
        .values(primitiveValues)
        .returningAll()
        .executeTakeFirst();

      if (!created) throw new Error(primitiveValues.name);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }

  async searchAll(): Promise<Planet[]> {
    try {
      const planets = await db.selectFrom("planets").selectAll().execute();

      return planets.map((planet) => Planet.fromPrimitives(planet));
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }
}
