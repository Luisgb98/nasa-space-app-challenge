import { cache } from "react";
import { cookies } from "next/headers";
import { Session, User } from "lucia";

import { lucia } from "@/lib/lucia/lucia";
import { container } from "@/app/inversify.config";
import { UserFinder } from "@/app/api/contexts/auth/users/application/user-finder/user-finder";
import { GetUserResponseDto } from "@/lib/dtos/users/get/get-user-response-dto";

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);

export const getUser = async (
  userId: string
): Promise<GetUserResponseDto | null> => {
  const userFinder = container.get<UserFinder>(UserFinder);
  return await userFinder.execute(userId);
};
