import "reflect-metadata";

import { Container } from "inversify";

import { TYPES } from "./types";

import { UserCreator } from "./api/contexts/auth/users/application/user-creator/user-creator";
import { UserVerifier } from "./api/contexts/auth/users/application/user-verifier/user-verifier";
import { UsersRepository } from "./api/contexts/auth/users/domain/users-repository";
import { KyselyUserRepository } from "./api/contexts/auth/users/infrastructure/kysely/kysely-users-repository";

const container = new Container();

container.bind<UsersRepository>(TYPES.USER).to(KyselyUserRepository);
container.bind<UserCreator>(UserCreator).toSelf();
container.bind<UserVerifier>(UserVerifier).toSelf();

export { container };
