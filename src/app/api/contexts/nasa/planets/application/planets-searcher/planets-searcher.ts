import { inject, injectable } from "inversify";

import {
  GetPlanetsDto,
  GetPlanetsDtoSchema,
} from "@/lib/dtos/planets/get/get-planets-dto";
import { TYPES } from "@/app/types";
import { PlanetsRepository } from "../../domain/planets-repository";

@injectable()
export class PlanetsSearcher {
  constructor(
    @inject(TYPES.PLANET) private readonly planetsRepository: PlanetsRepository
  ) {}

  async search(): Promise<GetPlanetsDto> {
    const planets = await this.planetsRepository.searchAll();

    const primitiveValues = planets.map((planet) => planet.toPrimitives());

    return GetPlanetsDtoSchema.parse(primitiveValues);
  }
}
