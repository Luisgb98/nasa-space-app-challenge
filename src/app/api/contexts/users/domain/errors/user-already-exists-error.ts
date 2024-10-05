import { UserError } from "./user-error";

export class UserAlreadyExistsError extends UserError {
  constructor(message: string) {
    super(`Error creating user: ${message}`);
  }
}
