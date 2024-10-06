import { injectable } from "inversify";

import { db } from "@/app/api/contexts/kernel/infrastructure/kysely/nasa-db";
import { UserId } from "@/app/api/contexts/kernel/domain/user-id";
import { WidgetConfig } from "../../domain/widget-config";
import { WidgetConfigRepository } from "../../domain/widget-config-repository";

@injectable()
export class KyselyWidgetConfigRepository implements WidgetConfigRepository {
  async upsert(config: WidgetConfig): Promise<void> {
    try {
      await db
        .insertInto("widget-configs")
        .values(config.toPrimitives())
        .onConflict((oc) =>
          oc.column("user_id").doUpdateSet(config.toPrimitives())
        )
        .execute();
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Ooops! Something went wrong");
    }
  }

  async findByUserId(userId: UserId): Promise<WidgetConfig | null> {
    const widgetConfig = await db
      .selectFrom("widget-configs")
      .selectAll()
      .where("user_id", "=", userId.value)
      .executeTakeFirst();

    if (!widgetConfig) return null;

    return WidgetConfig.fromPrimitives(widgetConfig);
  }
}
