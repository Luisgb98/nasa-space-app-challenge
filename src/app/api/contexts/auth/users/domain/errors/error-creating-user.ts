import { UserError } from "./user-error";

export class ErrorCreatingUser extends UserError {
  constructor(message: string) {
    super(`Error creating user: ${message}`);
  }
}
