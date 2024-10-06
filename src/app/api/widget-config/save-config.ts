import { container } from "@/app/inversify.config";
import { WidgetConfigUpsert } from "../contexts/nasa/widget-config/application/widget-config-upsert/widget-config-upsert";
import { CreateWidgetConfigDtoSchema } from "@/lib/dtos/widget-config/create/create-widget-config-dto";
import { validateRequest } from "@/app/auth/validate-request/validate-request";

async function saveConfig(formData: FormData): Promise<void> {
  const velocity = formData.get("velocity");
  const orbits = formData.get("orbits");
  const planets = formData.get("planets");
  const satellites = formData.get("satellites");
  const dwarfs = formData.get("dwarfs");

  const result = await validateRequest();
  if (!result.user) {
    return;
  }

  const widgetUpsert = container.get<WidgetConfigUpsert>(WidgetConfigUpsert);
  const widgetConfig = CreateWidgetConfigDtoSchema.parse({
    user_id: result.user.id,
    velocity: velocity as string,
    orbits: orbits as string,
    planets: planets as string,
    satellites: satellites as string,
    dwarfs: dwarfs as string,
  });

  await widgetUpsert.execute(widgetConfig);
}

export default saveConfig;
