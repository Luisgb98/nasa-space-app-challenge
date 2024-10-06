import { inject, injectable } from "inversify";

import {
  GetSatellitesDto,
  GetSatellitesDtoSchema,
} from "@/lib/dtos/satellite/get/get-satellites-dto";
import { TYPES } from "@/app/types";
import { SatellitesRepository } from "../../domain/satellites-repository";

@injectable()
export class SatellitesSearcher {
  constructor(
    @inject(TYPES.SATELLITE)
    private readonly satellitesRepository: SatellitesRepository
  ) {}

  async search(): Promise<GetSatellitesDto> {
    const satellites = await this.satellitesRepository.searchAll();

    const primitiveValues = satellites.map((satellite) =>
      satellite.toPrimitives()
    );

    return GetSatellitesDtoSchema.parse(primitiveValues);
  }
}
