import jwt from "jsonwebtoken";
import xss from "xss";
export const getTokenData = (request) => {
  const authHeader = xss(request.headers["authorization"]);
  const token = xss(request.signedCookies?.token) || xss(authHeader?.startsWith("Bearer ") ? xss(authHeader.split(" ")[1]) : null);
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};