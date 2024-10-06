"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia } from "@/lib/lucia/lucia";
import { container } from "@/app/inversify.config";
import { UserVerifier } from "@/app/api/contexts/auth/users/application/user-verifier/user-verifier";
import { GetUserDtoSchema } from "@/lib/dtos/users/get/get-user-dto";

async function signin(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return;
  }

  let id;
  try {
    const user = GetUserDtoSchema.parse({
      email,
      password,
    });

    const userVerifier = container.get<UserVerifier>(UserVerifier);
    const { userId } = await userVerifier.execute(user.email, user.password);
    id = userId;
  } catch (error) {
    if (error instanceof Error) {
      return;
    }
  }

  if (!id) {
    return;
  }

  const session = await lucia.createSession(id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}

export default signin;
