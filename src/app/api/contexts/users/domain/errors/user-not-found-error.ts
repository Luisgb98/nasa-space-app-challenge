import { UserError } from "./user-error";

export class UserNotFoundError extends UserError {
  constructor() {
    super(`User or password incorrect`);
  }
}
