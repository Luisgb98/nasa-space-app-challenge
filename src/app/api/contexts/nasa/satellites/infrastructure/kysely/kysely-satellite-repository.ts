import { injectable } from "inversify";

import { db } from "@/app/api/contexts/kernel/infrastructure/kysely/nasa-db";
import { Satellite } from "../../domain/satellite";
import { SatellitesRepository } from "../../domain/satellites-repository";

@injectable()
export class KyselyUSatelliteRepository implements SatellitesRepository {
  async create(satelliteData: Satellite): Promise<void> {
    try {
      const primitiveValues = {
        ...satelliteData.toPrimitives(),
        id: undefined,
      };

      const created = await db
        .insertInto("satellites")
        .values(primitiveValues)
        .returningAll()
        .executeTakeFirst();

      if (!created) throw new Error(primitiveValues.name);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }

  async searchAll(): Promise<Satellite[]> {
    try {
      const satellites = await db
        .selectFrom("satellites")
        .selectAll()
        .execute();

      return satellites.map((satellite) => Satellite.fromPrimitives(satellite));
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }
}
