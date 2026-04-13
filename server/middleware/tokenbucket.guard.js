import { RateLimiterMemory } from "rate-limiter-flexible";
const writeLimiter = new RateLimiterMemory({
  points: 1,     
  duration: 4
});
export const preventDuplicateWrites = async (request, response, next) => {
  const writeMethods = ["POST", "PUT", "PATCH", "DELETE"];
  if (!writeMethods.includes(request.method)) {
    return next();
  }
  try {
    const key = `${request.ip}:${request.method}:${request.originalUrl}`;
    console.log(key);
    await writeLimiter.consume(key);
    next();
  } catch {
    return response.status(429).json({
       success: false,
       error: "Please wait before sending another request",
    });
  }
};