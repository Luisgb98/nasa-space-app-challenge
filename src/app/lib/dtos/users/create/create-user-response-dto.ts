import { z } from "zod";

export const CreateUserResponseDtoSchema = z.object({
  userId: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseDtoSchema>;
