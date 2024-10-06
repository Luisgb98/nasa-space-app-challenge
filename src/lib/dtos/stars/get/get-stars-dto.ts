import { z } from "zod";

export const GetStarsDtoSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    actualRadius: z.number(),
    scaledRadius: z.number(),
    circumference: z.number(),
    rotationPeriod: z.number(),
    rotationSpeed: z.number(),
    texture: z.string(),
    actualDistance: z.number().optional(),
    scaledDistance: z.number().optional(),
  })
);

export type GetStarsDto = z.infer<typeof GetStarsDtoSchema>;
