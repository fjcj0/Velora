import { User } from "../models/user.model.js";
import { getTokenData } from "../utils/get-data.utils.js";
import { getRedis, setRedis } from "../utils/redis.utils.js";
import { sanitizeUser } from "../utils/sanitize.utils.js";
export const verifyAdmin = async (request, response, next) => {
  try {
    const decoded = getTokenData(request);
    if (!decoded) {
      return response.status(401).json({ success: false, error: "401 Unauthorized user" });
    }
    let existingUser = await getRedis(decoded.user._id.toString());
    if (!existingUser) {
      existingUser = await User.findById(decoded.user._id);
      if (!existingUser || !existingUser.isVerified || !existingUser.isAdmin) {
        return response.status(401).json({ success: false, error: "401 Unauthorized admin" });
      }
      await setRedis(existingUser._id.toString(), sanitizeUser(existingUser));
    }
    if (!existingUser.isVerified || !existingUser.isAdmin) {
      return response.status(401).json({ success: false, error: "401 Unauthorized admin" });
    }
    request.user = sanitizeUser(existingUser);
    next();
  } catch (error) {
    return response.status(500).json({ success: false, error: `Internal Server Error: ${error instanceof Error ? error.message : error}` });
  }
};