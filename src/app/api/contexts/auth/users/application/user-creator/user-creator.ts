import { inject, injectable } from "inversify";

import {
  CreateUserResponseDto,
  CreateUserResponseDtoSchema,
} from "@/lib/dtos/users/create/create-user-response-dto";
import { User } from "../../domain/user";
import { TYPES } from "@/app/types";
import { UserId } from "../../../../kernel/domain/user-id";
import { UserDate } from "../../domain/value-objects/user-date";
import { UserEmail } from "../../../../kernel/domain/user-email";
import { UserPassword } from "../../domain/value-objects/user-password";
import { UsersRepository } from "../../domain/users-repository";
import { UserAlreadyExistsError } from "../../domain/errors/user-already-exists-error";

interface UserCreatorProps {
  email: string;
  password: string;
}

@injectable()
export class UserCreator {
  constructor(
    @inject(TYPES.USER) private readonly usersRepository: UsersRepository
  ) {}

  async execute(userProps: UserCreatorProps): Promise<CreateUserResponseDto> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      new UserEmail(userProps.email)
    );
    if (emailAlreadyExists)
      throw new UserAlreadyExistsError("Email already exists");

    const userId = UserId.random();
    const password = await UserPassword.fromPlainString(userProps.password);

    const user = User.create(
      userId,
      new UserEmail(userProps.email),
      password,
      new UserDate(new Date()),
      new UserDate(new Date())
    );

    await this.usersRepository.create(user);

    return CreateUserResponseDtoSchema.parse({ userId: userId.value });
  }
}
