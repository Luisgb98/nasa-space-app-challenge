import { StringValueObject } from "../../../../kernel/domain/value-object/string-value-object";

import { Hasher } from "../../infrastructure/hashing/hasher";
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

    const isBcrypt = /^\$2[ayb]\$.{56}$/.test(value);

    if (!isBcrypt) {
      throw new UserEncryptionRypeError();
    }
  }

  static async fromPlainString(value: string): Promise<UserPassword> {
    const hasher = new Hasher();
    return new UserPassword(await hasher.hash(value));
  }

  async verify(hashedPassword: string): Promise<boolean> {
    const hasher = new Hasher();
    return hasher.verify(this.value, hashedPassword);
  }

  static validateMatch(password: string, passwordConfirmation: string): void {
    if (password !== passwordConfirmation) {
      throw new UserPasswordNotMatchError();
    }
  }
}
