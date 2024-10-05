import { container } from "@/app/inversify.config";
import { PlanetsSearcher } from "@/app/api/contexts/nasa/planets/application/planets-searcher/planets-searcher";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   const planetsSearcher = container.get<PlanetsSearcher>(PlanetsSearcher);
//   const planets = await planetsSearcher.search();

//   return Response.json({
//     status: 200,
//     data: planets,
//   });
// }

export async function GET(req: NextRequest) {
  try {
    const planetsSearcher = container.get<PlanetsSearcher>(PlanetsSearcher);
    const planets = await planetsSearcher.search();
    return NextResponse.json(planets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch planets" },
      { status: 500 }
    );
  }
}
