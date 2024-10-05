"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia } from "@/app/lib/lucia/lucia";
import { container } from "@/app/inversify.config";
import { UserCreator } from "@/app/api/contexts/users/application/user-creator/user-creator";
import { CreateUserDtoSchema } from "@/app/lib/dtos/users/create/create-user-dto";

async function signup(formData: FormData): Promise<void> {
  const email = formData.get("email");
  if (typeof email !== "string" || !/^[a-z0-9_-]+$/.test(email)) {
    return;
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 16
  ) {
    return;
  }

  let id;
  try {
    const user = CreateUserDtoSchema.parse({
      email,
      password,
    });

    const userCreator = container.get<UserCreator>(UserCreator);
    const { userId } = await userCreator.execute(user);
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

export default signup;
