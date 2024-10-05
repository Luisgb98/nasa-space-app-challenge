import { UserError } from "./user-error";

export class UserPasswordNotMatchError extends UserError {
  constructor() {
    super(`The password does not match.`);
  }
}
