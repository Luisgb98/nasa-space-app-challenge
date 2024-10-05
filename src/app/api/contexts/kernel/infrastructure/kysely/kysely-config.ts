export interface KyselyConfig {
  dialect: string;
  connection: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  maxConnections: number;
}
