import { client } from "../config/redis.config.js";

export const create = async (key, value) => {
  try {
    await client.set(key, value, { EX: 60 });
  } catch (error) {
    throw error;
  }
};

export const get = async (key) => {
  try {
    const value = await client.get(key);
    return value;
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
