import bcrypt from "bcrypt";

import { PasswordHasher } from "../../domain/hashing/password-hasher";

const saltRounds = 10;

export class Hasher implements PasswordHasher {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, saltRounds);
  }

  async verify(value: string, hashedValue: string): Promise<boolean> {
    return await bcrypt.compare(value, hashedValue);
  }
}
