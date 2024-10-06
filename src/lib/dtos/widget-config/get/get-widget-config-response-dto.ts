import { z } from "zod";

export const GetWidgetConfigResponseDtoSchema = z.object({
  velocity: z.string(),
  orbits: z.string(),
  planets: z.string(),
  satellites: z.string(),
  dwarfs: z.string(),
  user_id: z.string(),
});

export type GetWidgetConfigResponseDto = z.infer<
  typeof GetWidgetConfigResponseDtoSchema
>;
