import { z } from "zod";

export const GetUserVerifiedResponseDtoSchema = z.object({
  userId: z.string().regex(/^[a-zA-Z0-9_-]+$/),
});

export type GetUserVerifiedResponseDto = z.infer<
  typeof GetUserVerifiedResponseDtoSchema
>;
