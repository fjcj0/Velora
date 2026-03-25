import { client } from "../config/redis.config.js";
export const create = async (key, value, ttl = 60) => {
  try {
    const storeValue = typeof value === "object" ? JSON.stringify(value) : value;
    await client.set(key, storeValue, { EX: ttl });
  } catch (error) {
    throw error;
  }
};
export const get = async (key) => {
  try {
    const value = await client.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    throw error;
  }
};
export const deleteRedis = async (key) => {
  try {
    await client.del(key);
  } catch (error) {
    throw error;
  }
};