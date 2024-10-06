import { z } from "zod";

export const GetUserResponseDtoSchema = z.object({
  id: z.string(),
  email: z.string().email().trim(),
});

export type GetUserResponseDto = z.infer<typeof GetUserResponseDtoSchema>;
