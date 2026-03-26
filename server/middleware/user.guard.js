import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import xss from "xss";
import { checkRedis } from "../utils/redis.utils.js";
const getTokenData = (request) => {
  const authHeader = xss(request.headers["authorization"]);
  const token =
    request.cookies?.token || (authHeader && authHeader.split(" ")[1]);
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
export const verifyUser = async (request, response, next) => {
  try {
    const decoded = getTokenData(request);
    if (!decoded) {
      return response.status(401).json({
        success: false,
        error: "401 Unauthorized user",
      });
    }
    const existingUser = await checkRedis(decoded.user_id);
    // const existingUser = await User.findById(decoded.user._id);
    if (!existingUser || !existingUser.isVerified) {
      return response.status(401).json({
        success: false,
        error: "401 Unauthorized user",
      });
    }
    existingUser.isAdmin = existingUser.isAdmin
      ? existingUser.isAdmin
      : undefined;
    request.user = {
      ...existingUser._doc,
      password: undefined,
      verificationToken: undefined,
      verificationCode: undefined,
      expiredAt: undefined,
      resendAfter: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      __v: undefined,
    };
    next();
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
    });
  }
};
export const blockUser = async (request, response, next) => {
  try {
    const decoded = getTokenData(request);
    if (!decoded) return next();
    const existingUser = await User.findById(decoded.user._id);
    if (!existingUser) return next();
    return response.status(405).json({
      success: false,
      error: `405 Method Not Allowed You're already Login`,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
    });
  }
};
