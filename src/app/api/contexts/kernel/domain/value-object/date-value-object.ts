import { ValueObject } from "./value-object";
import { InvalidArgumentError } from "../errors/invalid-argument-error";

export class DateValueObject extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
    this.ensureIsValidDate(value);
  }

  ensureIsValidDate(value: Date): void {
    if (isNaN(value.getTime())) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> has an invalid date>`
      );
    }
  }
}
