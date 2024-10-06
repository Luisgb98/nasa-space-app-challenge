import { UserId } from "../../../kernel/domain/user-id";
import { UserDate } from "./value-objects/user-date";
import { UserEmail } from "../../../kernel/domain/user-email";
import { UserPassword } from "./value-objects/user-password";

interface UserPrimitives {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  readonly id: UserId;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly createdAt: UserDate;
  readonly updatedAt: UserDate;

  constructor(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    createdAt: UserDate,
    updatedAt: UserDate
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // TODO(lgb): Implementar eventos de dominio
  static create(
    id: UserId,
    email: UserEmail,
    password: UserPassword,
    createdAt: UserDate,
    updatedAt: UserDate
  ): User {
    const userAggregate = new User(id, email, password, createdAt, updatedAt);

    return userAggregate;
  }

  static fromPrimitives(plainData: UserPrimitives): User {
    return new User(
      new UserId(plainData.id),
      new UserEmail(plainData.email),
      new UserPassword(plainData.password),
      new UserDate(plainData.createdAt),
      new UserDate(plainData.updatedAt)
    );
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      email: this.email.value,
      password: this.password.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
