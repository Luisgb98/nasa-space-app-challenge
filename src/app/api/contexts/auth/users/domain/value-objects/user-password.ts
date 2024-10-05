import { StringValueObject } from "../../../../kernel/domain/value-object/string-value-object";

import { Argon2Hasher } from "../../infrastructure/hashing/argon2-hasher";
import { UserEncryptionRypeError } from "../errors/user-encryption-type-error";
import { UserPasswordNotMatchError } from "../errors/user-password-not-match-error";

export class UserPassword extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validateHashedValue(value);
  }

  validateHashedValue(value: string): void {
    if (!value) {
      throw new Error("User password is required");
    }

    const isArgon2 =
      /^\$argon2id\$v=(?:16|19)\$m=\d{1,10},t=\d{1,10},p=\d{1,3}(?:,keyid=[A-Za-z0-9+/]{0,11}(?:,data=[A-Za-z0-9+/]{0,43})?)?\$[A-Za-z0-9+/]{11,64}\$[A-Za-z0-9+/]{16,86}$/.test(
        value
      );

    if (!isArgon2) {
      throw new UserEncryptionRypeError();
    }
  }

  static async fromPlainString(value: string): Promise<UserPassword> {
    const hasher = new Argon2Hasher();
    return new UserPassword(await hasher.hash(value));
  }

  async verify(hashedPassword: string): Promise<boolean> {
    const hasher = new Argon2Hasher();
    return hasher.verify(this.value, hashedPassword);
  }

  static validateMatch(password: string, passwordConfirmation: string): void {
    if (password !== passwordConfirmation) {
      throw new UserPasswordNotMatchError();
    }
  }
}
