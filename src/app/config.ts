const env = {
  DB: {
    DB_DIALECT: "postgres",
    DB_DATABASE: process.env.POSTGRES_DATABASE ?? "",
    DB_HOSTNAME: process.env.POSTGRES_HOST ?? "",
    DB_USERNAME: process.env.POSTGRES_USER ?? "",
    DB_PASSWORD: process.env.POSTGRES_PASSWORD ?? "",
    DB_PORT: "",
    DB_POOL_MAX: process.env.DB_POOL_MAX ?? "",
    ssl: true,
  },
};

export default env;
