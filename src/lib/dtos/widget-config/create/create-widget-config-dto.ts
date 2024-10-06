import { z } from "zod";

export const CreateWidgetConfigDtoSchema = z.object({
  user_id: z.string(),
  velocity: z.number(),
  orbits: z.boolean(),
  planets: z.boolean(),
  satellites: z.boolean(),
  dwarfs: z.boolean(),
});

export type CreateWidgetConfigDto = z.infer<typeof CreateWidgetConfigDtoSchema>;
