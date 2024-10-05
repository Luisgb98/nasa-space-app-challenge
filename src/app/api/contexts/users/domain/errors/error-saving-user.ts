import { UserError } from "./user-error";

export class ErrorSavingUser extends UserError {
  constructor(message: string) {
    super(`Error saving user: ${message}`);
  }
}
