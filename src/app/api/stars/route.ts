import { NextResponse } from "next/server";

import { container } from "@/app/inversify.config";
import { StarsSearcher } from "../contexts/nasa/stars/application/stars-searcher/stars-searcher";

export async function GET() {
  const starsSearcher = container.get<StarsSearcher>(StarsSearcher);
  const stars = await starsSearcher.search();

  return NextResponse.json({ status: 200, data: stars });
}
