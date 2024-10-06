import { inject, injectable } from "inversify";

import {
  GetWidgetConfigResponseDto,
  GetWidgetConfigResponseDtoSchema,
} from "@/lib/dtos/widget-config/get/get-widget-config-response-dto";
import { TYPES } from "@/app/types";
import { UserId } from "@/app/api/contexts/kernel/domain/user-id";
import { WidgetConfigRepository } from "../../domain/widget-config-repository";

@injectable()
export class WidgetConfigFinder {
  constructor(
    @inject(TYPES.WIDGETCONFIG)
    private readonly widgetConfigRepository: WidgetConfigRepository
  ) {}

  async execute(userId: string): Promise<GetWidgetConfigResponseDto | null> {
    const id = new UserId(userId);
    const widgetConfig = await this.widgetConfigRepository.findByUserId(id);
    if (!widgetConfig) {
      return null;
    }

    return GetWidgetConfigResponseDtoSchema.parse(widgetConfig.toPrimitives());
  }
}
