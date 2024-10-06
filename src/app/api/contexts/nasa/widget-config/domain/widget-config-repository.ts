import { UserId } from "../../../kernel/domain/user-id";
import { WidgetConfig } from "./widget-config";

export abstract class WidgetConfigRepository {
  abstract upsert(config: WidgetConfig): Promise<void>;

  abstract findByUserId(userId: UserId): Promise<WidgetConfig | null>;
}
