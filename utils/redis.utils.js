import { client } from "../config/redis.config.js";
import { User } from "../models/user.model.js";
export const create = async (key, value, ttl = 60) => {
  try {
    const storeValue =
      typeof value === "object" ? JSON.stringify(value) : value;
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

export const checkRedis = async (key) => {
  try {
    const cached = await client.get(key);

    if (cached) {
      return JSON.parse(cached);
    }

    const existingUser = await User.findById(key);

    if (!existingUser) return null;

    await client.set(key, JSON.stringify(existingUser), {
      EX: 60,
    });

    return existingUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
