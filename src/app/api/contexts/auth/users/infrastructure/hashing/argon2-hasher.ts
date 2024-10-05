import { hash, verify } from "@node-rs/argon2";

import { PasswordHasher } from "../../domain/hashing/password-hasher";

export class Argon2Hasher implements PasswordHasher {
  async hash(value: string): Promise<string> {
    const hashedValue = await hash(value, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    return hashedValue;
  }

  async verify(value: string, hashedValue: string): Promise<boolean> {
    const isVerify = await verify(hashedValue, value, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    return isVerify;
  }
}
