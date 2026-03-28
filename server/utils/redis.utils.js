import { client } from "../config/redis.config.js";
export const getRedis = async (key) => {
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
export const setRedis = async (key, value, ttl = 60) => {
  try {
    if (value === undefined || value === null) return;
    await client.set(key, JSON.stringify(value), { EX: ttl });
  } catch (error) {
    throw error;
  }
};