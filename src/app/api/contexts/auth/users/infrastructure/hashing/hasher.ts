// import bcrypt from "bcrypt";

import { PasswordHasher } from "../../domain/hashing/password-hasher";

// const saltRounds = 10;

export class Hasher implements PasswordHasher {
  async hash(value: string): Promise<string> {
    // const hashedValue = await bcrypt.hash(value, saltRounds);

    // return hashedValue;
    return value;
  }

  async verify(value: string, hashedValue: string): Promise<boolean> {
    // const isVerify = await bcrypt.compare(value, hashedValue);

    // return isVerify;
    return value === hashedValue;
  }
}
