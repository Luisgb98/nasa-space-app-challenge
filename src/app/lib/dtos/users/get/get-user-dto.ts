import { z } from "zod";

export const GetUserDtoSchema = z.object({
  email: z.string().email().trim(),
});

export type GetUserDto = z.infer<typeof GetUserDtoSchema>;
