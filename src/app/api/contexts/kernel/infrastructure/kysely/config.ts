import env from "@/app/config";

const config = {
  dialect: {
    postgres: env.DB.DB_DIALECT,
  },
  database: env.DB.DB_DATABASE,
  host: env.DB.DB_HOSTNAME,
  user: env.DB.DB_USERNAME,
  password: env.DB.DB_PASSWORD,
  port: parseInt(env.DB.DB_PORT, 10),
  max: parseInt(env.DB.DB_POOL_MAX, 10),
  ssl: env.DB.SSL,
};

export default config;
