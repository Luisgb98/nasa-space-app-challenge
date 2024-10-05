"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia } from "@/lib/lucia/lucia";
import { container } from "@/app/inversify.config";
import { UserCreator } from "@/app/api/contexts/auth/users/application/user-creator/user-creator";
import { CreateUserDtoSchema } from "@/lib/dtos/users/create/create-user-dto";

async function signup(formData: FormData): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
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
