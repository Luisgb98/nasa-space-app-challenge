import "reflect-metadata";

import { Container } from "inversify";

import { TYPES } from "./types";

import { UserCreator } from "./api/contexts/auth/users/application/user-creator/user-creator";
import { UserVerifier } from "./api/contexts/auth/users/application/user-verifier/user-verifier";
import { UsersRepository } from "./api/contexts/auth/users/domain/users-repository";
import { KyselyUserRepository } from "./api/contexts/auth/users/infrastructure/kysely/kysely-users-repository";

import { PlanetsSearcher } from "./api/contexts/nasa/planets/application/planets-searcher/planets-searcher";
import { PlanetsRepository } from "./api/contexts/nasa/planets/domain/planets-repository";
import { KyselyUPlanetRepository } from "./api/contexts/nasa/planets/infrastructure/kysely/kysely-planet-repository";

const container = new Container();

container.bind<UsersRepository>(TYPES.USER).to(KyselyUserRepository);
container.bind<UserCreator>(UserCreator).toSelf();
container.bind<UserVerifier>(UserVerifier).toSelf();

container.bind<PlanetsRepository>(TYPES.PLANET).to(KyselyUPlanetRepository);
container.bind<PlanetsSearcher>(PlanetsSearcher).toSelf();

export { container };
