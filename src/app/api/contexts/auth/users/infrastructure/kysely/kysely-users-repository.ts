import { injectable } from "inversify";

import { db } from "@/app/api/contexts/kernel/infrastructure/kysely/nasa-db";
import { User } from "../../domain/user";
import { UserEmail } from "../../../../kernel/domain/user-email";
import { UsersRepository } from "../../domain/users-repository";
import { ErrorSavingUser } from "../../domain/errors/error-saving-user";
import { ErrorCreatingUser } from "../../domain/errors/error-creating-user";
import { UserId } from "@/app/api/contexts/kernel/domain/user-id";

@injectable()
export class KyselyUserRepository implements UsersRepository {
  async create(userData: User): Promise<void> {
    try {
      const created = await db
        .insertInto("users")
        .values(userData.toPrimitives())
        .returningAll()
        .executeTakeFirst();

      if (!created) throw new ErrorCreatingUser(userData.id.value);
    } catch (error) {
      if (error instanceof ErrorCreatingUser) throw error;

      if (error instanceof Error)
        throw new ErrorCreatingUser("Ooops! Something went wrong");

      throw new ErrorCreatingUser("Unknown error");
    }
  }

  async save(user: User): Promise<void> {
    try {
      const primitiveValues = {
        ...user.toPrimitives(),
        updatedAt: new Date().toISOString(),
      };

      const saved = await db
        .updateTable("users")
        .set(primitiveValues)
        .where("id", "=", primitiveValues.id)
        .execute();

      if (!saved) throw new ErrorSavingUser(primitiveValues.id);
    } catch (error) {
      if (error instanceof ErrorSavingUser) throw error;

      if (error instanceof Error)
        throw new ErrorSavingUser("Ooops! Something went wrong");

      throw new ErrorSavingUser("Unknown error");
    }
  }

  async findByEmail(email: UserEmail): Promise<User | undefined | null> {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email.value)
      .executeTakeFirst();

    if (!user) return null;

    return User.fromPrimitives(user);
  }

  async findById(userId: UserId): Promise<User | undefined | null> {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", userId.value)
      .executeTakeFirst();

    if (!user) return null;

    return User.fromPrimitives(user);
  }
}
