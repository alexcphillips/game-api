import { redis } from "./index";
import { AppConstants } from "../../app.constants";

const { ONE_DAY_IN_MS } = AppConstants;

if (!process.env.CACHE_TTL_MS_DEFAULT) {
  console.warn(
    "Missing env CACHE_TTL_MS_DEFAULT value, defaulting cache to one day",
  );
  process.env.CACHE_TTL_MS_DEFAULT = String(ONE_DAY_IN_MS);
}

let CACHE_TTL_MS_DEFAULT;
if (process.env.CACHE_TTL_MS_DEFAULT) {
  CACHE_TTL_MS_DEFAULT = Number(process.env.CACHE_TTL_MS_DEFAULT);
}

let CACHE_TTL_MS_OVERRIDE;
if (process.env.CACHE_TTL_MS_OVERRIDE) {
  CACHE_TTL_MS_OVERRIDE = Number(process.env.CACHE_TTL_MS_OVERRIDE);
}

export const keys = async (key: string) => {
  console.log(`Getting cached keys for: ${key}`);
  const result = await redis.cache.keys(key);
  return result;
};

export const get = async (key: string) => {
  console.log(`Getting cached key: ${key}`);
  const result = await redis.cache.get(key);
  return result;
};

export const set = async (key: string, value, ttl?: number) => {
  console.log(`setting cached key: ${key} - value:`, JSON.stringify(value));
  return await redis.cache.set(key, JSON.stringify(value), {
    EX: CACHE_TTL_MS_OVERRIDE ?? ttl ?? CACHE_TTL_MS_DEFAULT,
  });
};

export const del = async (key: string) => {
  console.log(`deletign cached key: ${key}`);
  return await redis.cache.del(key);
};
