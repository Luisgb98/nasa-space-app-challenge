import { InvalidArgumentError } from "../errors/invalid-argument-error";

export abstract class EnumValueObject<T> {
  readonly value: T;

  constructor(value: T, public readonly validValues: T[]) {
    this.value = value;
    this.checkValueIsValid(value);
  }

  public checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      throw new InvalidArgumentError(
        `${value} is not a valid value for enum ${this.constructor.name}`
      );
    }
  }
}
