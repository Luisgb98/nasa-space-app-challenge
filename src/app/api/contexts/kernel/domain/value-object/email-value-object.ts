import { StringValueObject } from "./string-value-object";
import { InvalidArgumentError } from "../errors/invalid-argument-error";

export class EmailValueObject extends StringValueObject {
  constructor(value: string) {
    super(value);
    EmailValueObject.validateEmail(value);
  }

  static validateEmail(value: string): void {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new InvalidArgumentError(`Email ${value} is invalid`);
    }
  }
}
