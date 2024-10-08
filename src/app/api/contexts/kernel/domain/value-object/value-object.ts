import { InvalidArgumentError } from "../errors/invalid-argument-error";

export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  private readonly _value: T;
  public get value(): T {
    return this._value;
  }

  constructor(value: T) {
    this._value = value;
    this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError("Value must be defined");
    }
  }

  equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }

  toString(): string {
    return this.value.toString();
  }
}
