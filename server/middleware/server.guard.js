import xss from "xss";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import slowDown from "express-slow-down";
export const validateWhitelist = (schema = { body: [], query: [], params: [] }) => {
  return (request, response, next) => {
    const sanitizeObject = (obj) => {
      if (!obj) return obj;
      const cleaned = {};
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "string") {
          cleaned[key] = xss(obj[key]);
        } else {
          cleaned[key] = obj[key];
        }
      });
      return cleaned;
    };
    const body = sanitizeObject(request.body);
    const query = sanitizeObject(request.query);
    const params = sanitizeObject(request.params);
    const collectInvalid = (source, allowed, sourceName) => {
      return Object.keys(source || {})
        .filter((key) => !allowed.includes(key))
        .map((key) => `${sourceName}.${key}`);
    };
    if ( ((schema.body || []).length === 0 && Object.keys(body || {}).length > 0) ||
      ((schema.query || []).length === 0 && Object.keys(query || {}).length > 0) ||
      ((schema.params || []).length === 0 && Object.keys(params || {}).length > 0)) {
      return res.status(400).json({
        success: false,
        error: "Invalid fields: unexpected data sent",
      });
    }
    const invalidFields = [
      ...collectInvalid(body, schema.body || [], "body"),
      ...collectInvalid(query, schema.query || [], "query"),
      ...collectInvalid(params, schema.params || [], "params"),
    ];
    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid fields: ${invalidFields.join(", ")}`,
      });
    }
    next();
  };
};
export const csrfProtection = (request, response, next) => {
  const csrfTokenCookie = request.signedCookies.csrfToken;
  if (process.env.NODE_ENV === 'production') {
    const csrfTokenHeader = request.headers["x-csrf-token"];
    if (!csrfTokenCookie || !csrfTokenHeader) {
      return response.status(403).json({
        success: false,
        error: "CSRF token missing",
      });
    }
    if (csrfTokenCookie !== csrfTokenHeader) {
      return response.status(403).json({
        success: false,
        error: "Invalid CSRF token",
      });
    }
  } else {
      if (!csrfTokenCookie) {
      return response.status(403).json({
        success: false,
        error: "Invalid CSRF token",
      });
    }
  }
  const origin = request.headers.origin;
  const allowedOrigin = process.env.CLIENT_URL;
  if (origin && allowedOrigin && origin !== allowedOrigin) {
    return response.status(403).json({
      success: false,
      error: "Invalid origin",
    });
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
    return `${ipPart}`;
  },
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  message: {
    success: false,
    message: "Too many requests",
  },
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
      if (!request.headers[header]) {
        return response.status(403).json({
          success: false,
          message: "Invalid browser request",
        });
      }
    }
  }
  next();
};
export const protectFromReverseHttp = (request, response, next) => {
  if (process.env.NODE_ENV === "development") {
    const allowed = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];
    if (!allowed.includes(request.socket.remoteAddress)) {
      return response.status(403).send("Forbidden");
    }
  }
  next();
};