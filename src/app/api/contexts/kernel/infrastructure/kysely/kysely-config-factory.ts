import config from "./config";
import { KyselyConfig } from "./kysely-config";

export class KyselyConfigFactory {
  static createKyselyConfig(): KyselyConfig {
    return {
      dialect: config.dialect.postgres,
      connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        ssl: config.ssl,
      },
      maxConnections: config.max,
    };
  }
}
