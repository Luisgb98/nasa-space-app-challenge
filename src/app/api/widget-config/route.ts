import { NextResponse } from "next/server";

import { container } from "@/app/inversify.config";
import { validateRequest } from "@/app/auth/validate-request/validate-request";
import { WidgetConfigUpsert } from "../contexts/nasa/widget-config/application/widget-config-upsert/widget-config-upsert";
import { CreateWidgetConfigDtoSchema } from "@/lib/dtos/widget-config/create/create-widget-config-dto";
import { WidgetConfigFinder } from "../contexts/nasa/widget-config/application/widget-config-finder/widget-config-finder";

export async function GET() {
  const result = await validateRequest();
  console.log(result);
  if (!result.user) {
    return NextResponse.json({
      status: 401,
      data: { message: "Unauthorized" },
    });
  }

  const widgetConfigFinder =
    container.get<WidgetConfigFinder>(WidgetConfigFinder);
  const widgetConfig = await widgetConfigFinder.execute(result.user.id);
  console.log("w", widgetConfig);
  return NextResponse.json({
    status: 200,
    data: widgetConfig,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await validateRequest();
  if (!result.user) {
    return;
  }

  const widgetUpsert = container.get<WidgetConfigUpsert>(WidgetConfigUpsert);
  const widgetConfig = CreateWidgetConfigDtoSchema.parse({
    user_id: result.user.id,
    velocity: parseInt(body.velocity),
    orbits: body.orbits,
    planets: body.planets,
    satellites: body.satellites,
    dwarfs: body.dwarfs,
  });

  await widgetUpsert.execute(widgetConfig);

  return NextResponse.json({
    status: 200,
    data: { message: "Widget config saved" },
  });
}
