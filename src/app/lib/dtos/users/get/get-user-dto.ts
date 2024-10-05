import { z } from "zod";

export const GetUserDtoSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).max(16).trim(),
});

export type GetUserDto = z.infer<typeof GetUserDtoSchema>;
