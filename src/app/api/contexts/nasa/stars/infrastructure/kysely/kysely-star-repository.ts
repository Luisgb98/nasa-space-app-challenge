import { injectable } from "inversify";

import { db } from "@/app/api/contexts/kernel/infrastructure/kysely/nasa-db";
import { Star } from "../../domain/star";
import { StarsRepository } from "../../domain/stars-repository";

@injectable()
export class KyselyStarRepository implements StarsRepository {
  async create(starData: Star): Promise<void> {
    try {
      const primitiveValues = {
        ...starData.toPrimitives(),
        id: undefined,
      };

      const created = await db
        .insertInto("stars")
        .values(primitiveValues)
        .returningAll()
        .executeTakeFirst();

      if (!created) throw new Error(primitiveValues.name);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }

  async searchAll(): Promise<Star[]> {
    try {
      const stars = await db.selectFrom("stars").selectAll().execute();

      return stars.map((star) =>
        Star.fromPrimitives({
          ...star,
          actualDistance: star.actualDistance || undefined,
          scaledDistance: star.scaledDistance || undefined,
        })
      );
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }
}
