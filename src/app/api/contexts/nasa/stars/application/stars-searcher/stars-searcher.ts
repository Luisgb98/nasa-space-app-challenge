import { inject, injectable } from "inversify";

import {
  GetStarsDto,
  GetStarsDtoSchema,
} from "@/lib/dtos/stars/get/get-stars-dto";
import { TYPES } from "@/app/types";
import { StarsRepository } from "../../domain/stars-repository";

@injectable()
export class SatellitesSearcher {
  constructor(
    @inject(TYPES.SATELLITE)
    private readonly starsRepository: StarsRepository
  ) {}

  async search(): Promise<GetStarsDto> {
    const stars = await this.starsRepository.searchAll();

    const primitiveValues = stars.map((star) => star.toPrimitives());

    return GetStarsDtoSchema.parse(primitiveValues);
  }
}
