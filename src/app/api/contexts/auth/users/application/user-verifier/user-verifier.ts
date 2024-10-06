import { inject, injectable } from "inversify";

import { TYPES } from "@/app/types";
import { UserEmail } from "../../../../kernel/domain/user-email";
import { UserPassword } from "../../domain/value-objects/user-password";
import { UsersRepository } from "../../domain/users-repository";
import { UserNotFoundError } from "../../domain/errors/user-not-found-error";
import { UserPasswordNotMatchError } from "../../domain/errors/user-password-not-match-error";
import { GetUserVerifiedResponseDto } from "@/lib/dtos/users/get/get-user-verified-response-dto";

@injectable()
export class UserVerifier {
  constructor(
    @inject(TYPES.USER) private readonly usersRepository: UsersRepository
  ) {}

  async execute(
    email: string,
    password: string
  ): Promise<GetUserVerifiedResponseDto> {
    const userEmail = new UserEmail(email);
    const user = await this.usersRepository.findByEmail(userEmail);
    if (!user) {
      throw new UserNotFoundError();
    }

    const hashedPassword = await UserPassword.fromPlainString(password);
    const userPassword = user.password;
    const isVerified = userPassword.verify(hashedPassword.value);
    if (!isVerified) {
      throw new UserPasswordNotMatchError();
    }

    return {
      userId: user.id.value,
    };
  }
}
