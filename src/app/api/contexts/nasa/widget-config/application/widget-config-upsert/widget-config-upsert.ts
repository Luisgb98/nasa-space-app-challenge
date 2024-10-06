import { inject, injectable } from "inversify";

import { TYPES } from "@/app/types";
import { UserId } from "@/app/api/contexts/kernel/domain/user-id";
import { WidgetConfig } from "../../domain/widget-config";
import { WidgetConfigId } from "../../domain/value-objects/widget-config-id";
import { WidgetConfigBool } from "../../domain/value-objects/widget-config-bool";
import { WidgetConfigNumber } from "../../domain/value-objects/widget-config-number";
import { WidgetConfigRepository } from "../../domain/widget-config-repository";

interface WidgetConfigUpsertProps {
  user_id: string;
  velocity: number;
  orbits: boolean;
  planets: boolean;
  satellites: boolean;
  dwarfs: boolean;
}

@injectable()
export class WidgetConfigUpsert {
  constructor(
    @inject(TYPES.WIDGETCONFIG)
    private readonly widgetConfigRepository: WidgetConfigRepository
  ) {}

  async execute(props: WidgetConfigUpsertProps): Promise<void> {
    const userId = new UserId(props.user_id);
    const widgetConfig = await this.widgetConfigRepository.findByUserId(userId);

    const newWidgetConfig = WidgetConfig.create(
      new WidgetConfigId(widgetConfig?.id.value ?? 0),
      new WidgetConfigNumber(props.velocity),
      new WidgetConfigBool(props.planets),
      new WidgetConfigBool(props.orbits),
      new WidgetConfigBool(props.satellites),
      new WidgetConfigBool(props.dwarfs),
      userId
    );

    await this.widgetConfigRepository.upsert(newWidgetConfig);
  }
}
