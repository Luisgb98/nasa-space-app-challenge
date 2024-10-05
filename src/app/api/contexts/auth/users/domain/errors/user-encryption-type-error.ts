import { UserError } from "./user-error";

export class UserEncryptionRypeError extends UserError {
  constructor() {
    super(`The encryption type is invalid.`);
  }
}
