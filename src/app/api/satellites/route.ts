import { NextResponse } from "next/server";

import { container } from "@/app/inversify.config";
import { SatellitesSearcher } from "../contexts/nasa/satellites/application/satellites-searcher/satellites-searcher";

export async function GET() {
  const satellitesSearcher =
    container.get<SatellitesSearcher>(SatellitesSearcher);
  const satellites = await satellitesSearcher.search();

  return NextResponse.json({ status: 200, data: satellites });
}
