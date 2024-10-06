const env = {
  //   DB: {
  //     DB_DIALECT: process.env.DB_DIALECT ?? "",
  //     DB_DATABASE: process.env.DB_DATABASE ?? "",
  //     DB_HOSTNAME: process.env.DB_HOSTNAME ?? "",
  //     DB_USERNAME: process.env.DB_USERNAME ?? "",
  //     DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  //     DB_PORT: process.env.DB_PORT ?? "",
  //     DB_POOL_MAX: process.env.DB_POOL_MAX ?? "",
  //   },
  DB: {
    DB_DIALECT: "postgres",
    DB_DATABASE: process.env.POSTGRES_DATABASE ?? "",
    DB_HOSTNAME: process.env.POSTGRES_HOST ?? "",
    DB_USERNAME: process.env.POSTGRES_USER ?? "",
    DB_PASSWORD: process.env.POSTGRES_PASSWORD ?? "",
    DB_PORT: "",
    DB_POOL_MAX: process.env.DB_POOL_MAX ?? "",
  },
};

export default env;
