import { inject, injectable } from "inversify";

import {
  GetUserResponseDto,
  GetUserResponseDtoSchema,
} from "@/lib/dtos/users/get/get-user-response-dto";
import { TYPES } from "@/app/types";
import { UserId } from "@/app/api/contexts/kernel/domain/user-id";
import { UsersRepository } from "../../domain/users-repository";

@injectable()
export class UserFinder {
  constructor(
    @inject(TYPES.USER) private readonly usersRepository: UsersRepository
  ) {}

  async execute(userId: string): Promise<GetUserResponseDto | null> {
    const id = new UserId(userId);
    const user = await this.usersRepository.findById(id);
    if (!user) {
      return null;
    }

    return GetUserResponseDtoSchema.parse(user.toPrimitives());
  }
}
