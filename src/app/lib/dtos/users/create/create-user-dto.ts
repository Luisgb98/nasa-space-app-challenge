import { z } from "zod";

export const CreateUserDtoSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6).max(16).trim(),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
