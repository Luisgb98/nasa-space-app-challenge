import { User } from "./user";
import { UserEmail } from "../../kernel/domain/user-email";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;

  abstract findByEmail(email: UserEmail): Promise<User | undefined | null>;
}
