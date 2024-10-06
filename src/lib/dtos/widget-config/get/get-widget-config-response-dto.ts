import { z } from "zod";

export const GetWidgetConfigResponseDtoSchema = z.object({
  velocity: z.number(),
  orbits: z.boolean(),
  planets: z.boolean(),
  satellites: z.boolean(),
  dwarfs: z.boolean(),
  user_id: z.string(),
});

export type GetWidgetConfigResponseDto = z.infer<
  typeof GetWidgetConfigResponseDtoSchema
>;
