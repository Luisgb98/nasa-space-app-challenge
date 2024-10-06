import "reflect-metadata";

import { Container } from "inversify";

import { TYPES } from "./types";

import { UserFinder } from "./api/contexts/auth/users/application/user-finder/user-finder";
import { UserCreator } from "./api/contexts/auth/users/application/user-creator/user-creator";
import { UserVerifier } from "./api/contexts/auth/users/application/user-verifier/user-verifier";
import { UsersRepository } from "./api/contexts/auth/users/domain/users-repository";
import { KyselyUserRepository } from "./api/contexts/auth/users/infrastructure/kysely/kysely-users-repository";

import { PlanetsSearcher } from "./api/contexts/nasa/planets/application/planets-searcher/planets-searcher";
import { PlanetsRepository } from "./api/contexts/nasa/planets/domain/planets-repository";
import { KyselyPlanetRepository } from "./api/contexts/nasa/planets/infrastructure/kysely/kysely-planet-repository";

import { SatellitesSearcher } from "./api/contexts/nasa/satellites/application/satellites-searcher/satellites-searcher";
import { SatellitesRepository } from "./api/contexts/nasa/satellites/domain/satellites-repository";
import { KyselySatelliteRepository } from "./api/contexts/nasa/satellites/infrastructure/kysely/kysely-satellite-repository";

import { StarsSearcher } from "./api/contexts/nasa/stars/application/stars-searcher/stars-searcher";
import { StarsRepository } from "./api/contexts/nasa/stars/domain/stars-repository";
import { KyselyStarRepository } from "./api/contexts/nasa/stars/infrastructure/kysely/kysely-star-repository";

const container = new Container();

container.bind<UsersRepository>(TYPES.USER).to(KyselyUserRepository);
container.bind<UserCreator>(UserCreator).toSelf();
container.bind<UserVerifier>(UserVerifier).toSelf();
container.bind<UserFinder>(UserFinder).toSelf();

container.bind<PlanetsRepository>(TYPES.PLANET).to(KyselyPlanetRepository);
container.bind<PlanetsSearcher>(PlanetsSearcher).toSelf();

container
  .bind<SatellitesRepository>(TYPES.SATELLITE)
  .to(KyselySatelliteRepository);
container.bind<SatellitesSearcher>(SatellitesSearcher).toSelf();

container.bind<StarsRepository>(TYPES.STAR).to(KyselyStarRepository);
container.bind<StarsSearcher>(StarsSearcher).toSelf();

export { container };
