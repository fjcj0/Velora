import xss from "xss";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import slowDown from "express-slow-down";
export const validateWhitelist = (schema = { body: [], query: [], params: [] }) => {
  return (request, response, next) => {
    const sanitizeDeep = (value) => {
      if (typeof value === "string") {
        return xss(value);
      }
      if (Array.isArray(value)) {
        return value.map(sanitizeDeep);
      }
      if (value && typeof value === "object") {
        const cleaned = {};
        Object.keys(value).forEach((key) => {
          cleaned[key] = sanitizeDeep(value[key]);
        });
        return cleaned;
      }
      return value;
    };
    const body = sanitizeDeep(request.body);
    const query = sanitizeDeep(request.query);
    const params = sanitizeDeep(request.params);
    const collectInvalid = (source, allowed) => {
      return Object.keys(source || {}).filter(
        (key) => !allowed.includes(key)
      );
    };
    const invalidFields = [
      ...collectInvalid(body, schema.body || []),
      ...collectInvalid(query, schema.query || []),
      ...collectInvalid(params, schema.params || [])
    ];
    if (invalidFields.length > 0) {
      return response.status(400).json({
        success: false,
        error: `Invalid fields: ${invalidFields.join(", ")}`
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