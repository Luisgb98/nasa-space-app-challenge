"use server";

import { lucia } from "@/lib/lucia/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRequest } from "@/app/layout";

async function signout(): Promise<void> {
  const { session } = await validateRequest();
  if (!session) {
    return redirect("/auth/signin");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export default signout;
