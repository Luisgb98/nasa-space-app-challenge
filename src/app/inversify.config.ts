import "reflect-metadata";

import { Container } from "inversify";

import { TYPES } from "./types";

import { UserCreator } from "./api/contexts/users/application/user-creator/user-creator";
import { UsersRepository } from "./api/contexts/users/domain/users-repository";
import { KyselyUserRepository } from "./api/contexts/users/infrastructure/kysely/kysely-users-repository";

const container = new Container();

container.bind<UsersRepository>(TYPES.USER).to(KyselyUserRepository);
container.bind<UserCreator>(UserCreator).toSelf();

export { container };
