import { z } from "zod";

export const GetPlanetsDtoSchema = z.array(
  z.object({
    name: z.string(),
    actualRadius: z.number(),
    scaledRadius: z.number(),
    actualDistanceFromSun: z.number(),
    scaledDistance: z.number(),
    circumference: z.number(),
    rotationPeriod: z.number(),
    rotationSpeed: z.number(),
    translationSpeed: z.number(),
    mayorAxis: z.number(),
    eccentricity: z.number(),
    texture: z.string(),
    dwarf: z.boolean(),
  })
);

export type GetPlanetsDto = z.infer<typeof GetPlanetsDtoSchema>;
