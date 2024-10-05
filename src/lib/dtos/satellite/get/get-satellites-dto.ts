import { z } from "zod";

export const GetSatellitesDtoSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    actualRadius: z.number(),
    scaledRadius: z.number(),
    actualDistanceFromPlanet: z.number(),
    scaledDistance: z.number(),
    circumference: z.number(),
    rotationPeriod: z.number(),
    rotationSpeed: z.number(),
    planet_name: z.string(),
  })
);

export type GetSatellitesDto = z.infer<typeof GetSatellitesDtoSchema>;
