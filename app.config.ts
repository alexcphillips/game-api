const {
  USE_REDIS,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  APPLICATION_ENV,
  PORT,
  DB_URL,
} = process.env;

const ApiConfig = {
  USE_REDIS: USE_REDIS === "true",
  REDIS_HOST: REDIS_HOST || "localhost",
  REDIS_PORT: REDIS_PORT || "6379",
  REDIS_USERNAME,
  REDIS_PASSWORD,
  APPLICATION_ENV,
  PORT: PORT || "3000",
  DB_URL: DB_URL || "mongodb://localhost:27017",
};

export { ApiConfig };
