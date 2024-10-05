import { generateIdFromEntropySize } from "lucia";

import { StringValueObject } from "./value-object/string-value-object";

export class UserId extends StringValueObject {
  constructor(value: string) {
    super(value);
  }

  static random(): UserId {
    return new UserId(generateIdFromEntropySize(10));
  }
}
