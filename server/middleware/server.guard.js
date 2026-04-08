import xss from "xss";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import slowDown from "express-slow-down";
export const xss_protection = (request, response, next) => {
  const clean = (value) => (typeof value === "string" ? xss(value) : value);
  for (let key in request.query) request.query[key] = clean(request.query[key]);
  for (let key in request.body) request.body[key] = clean(request.body[key]);
  for (let key in request.params)
    request.params[key] = clean(request.params[key]);
  next();
};
export const csrfProtection = (request, response, next) => {
  const csrfTokenCookie = request.signedCookies.csrfToken;
  /*
  const csrfTokenHeader = xss(request.headers["x-csrf-token"]);
  if (!csrfTokenCookie || !csrfTokenHeader) {
    return response.status(403).json({ success: false,error: "CSRF token missing" });
  }
  if (csrfTokenCookie !== csrfTokenHeader) {
    return response.status(403).json({ success: false,error: "Invalid CSRF token" });
  }
  */
  if (!csrfTokenCookie) {
    return response.status(403).json({ success: false,error: "CSRF token missing" });
  }
  next();
};
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (request) => {
    const ipPart = ipKeyGenerator(request);
    const uaPart = xss(request.headers["user-agent"] || "unknown");
    return `${ipPart}|${uaPart}`;
  },
  message: { success: false, message: "Too many requests" },
});
export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
});
const allowedBrowsers = [
  /Chrome/i,
  /Firefox/i,
  /Edg/i,
  /OPR/i,
  /Safari/i,
  /PostmanRuntime/i,
];
export const browserOnly = (request, response, next) => {
  const userAgent = xss(request.headers["user-agent"] || "");
  if (!allowedBrowsers.some((regex) => regex.test(userAgent))) {
    return response.status(403).json({
      success: false,
      message: "Only real browsers are allowed",
    });
  }
  if (!/PostmanRuntime/i.test(userAgent)) {
    const requiredHeaders = ["accept", "accept-language", "sec-fetch-site"];
    for (const header of requiredHeaders) {
      if (!xss(request.headers[header])) {
        return response.status(403).json({
          success: false,
          message: "Invalid browser request",
        });
      }
    }
  }
  next();
};