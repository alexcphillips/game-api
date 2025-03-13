import { ApiConfig } from "../../app.config";
import { createClient, RedisClientOptions } from "redis";

export type RedisClientType = ReturnType<typeof createClient>;
export const redis: { cache: null | Record<string, any> | RedisClientType } = {
  cache: null,
};

export const connectRedis = async () => {
  try {
    const opts: RedisClientOptions = {
      username: ApiConfig.REDIS_USERNAME,
      password: ApiConfig.REDIS_PASSWORD,
      socket: {
        host: ApiConfig.REDIS_HOST,
        port: Number(ApiConfig.REDIS_PORT),
      },
    };

    const redisClient: RedisClientType = await createClient(opts)
      .on("error", (err) => console.log("Redis Client Error"))
      .on("connect", () => console.log("Redis Connected"))
      .on("reconnecting", () => console.log("Redis Reconnecting"))
      .on("end", () => console.log("Redis Connection Closed"))
      .connect();

    redis.cache = redisClient;

    if (process.env.RESET_REDIS_ON_STARTUP) {
      redis.cache.flushAll().catch((err) => {
        console.log("error", err);
      });
    }
    return redisClient;
  } catch (err) {
    console.log("Redis err:", err);
  }
};

connectRedis();
