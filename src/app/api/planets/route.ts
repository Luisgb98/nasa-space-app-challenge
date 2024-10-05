import { NextResponse } from "next/server";
import { container } from "@/app/inversify.config";
import { PlanetsSearcher } from "../contexts/nasa/planets/application/planets-searcher/planets-searcher";

export async function GET() {
  const planetsSearcher = container.get<PlanetsSearcher>(PlanetsSearcher);
  const planets = await planetsSearcher.search();

  return NextResponse.json({ status: 200, data: planets });
}
