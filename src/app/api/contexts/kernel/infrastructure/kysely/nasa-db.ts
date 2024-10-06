import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

import { DB } from "./db-types";
import { KyselyConfigFactory } from "./kysely-config-factory";

export class KeystrokeDb extends Kysely<DB> {}

const config = KyselyConfigFactory.createKyselyConfig();

export const pool = new pg.Pool({
  database: config.connection.database,
  host: config.connection.host,
  user: config.connection.user,
  password: config.connection.password,
  port: config.connection.port,
  max: config.maxConnections,
  ssl: config.connection.ssl,
});

export const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<DB>({
  dialect,
});
