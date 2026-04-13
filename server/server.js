import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import carRoutes from "./routes/car.route.js";
import aiRoutes from "./routes/ai.route.js";
import googleRoutes from "./routes/google.route.js";
import connectToDB from "./config/connect.config.js";
import passport from "./config/passport.config.js";
import job from "./config/cron.config.js";
import {
  browserOnly,
  csrfProtection,
  protectFromReverseHttp,
  rateLimiter,
  speedLimiter,
  validateWhitelist
} from "./middleware/server.guard.js";
import { csrf } from "./controllers/csrf.controller.js";
import { preventDuplicateWrites } from "./middleware/tokenbucket.guard.js";
import { connectToRedis } from "./config/redis.config.js";
(async () => {
  try {
    await connectToRedis();
  } catch (error) {
    console.error("Redis operation failed:", error);
  }
})();
const app = express();
app.set("trust proxy", false);
app.disable("x-powered-by");
morgan.token("client-ip", (request) => request.ip);
app.use(
  morgan("➜ :method :url :status :response-time ms - :res[content-length] - :client-ip")
);
app.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    frameguard: { action: "deny" },
    crossOriginResourcePolicy: { policy: "same-site" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginEmbedderPolicy: false
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:5173"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"]
    }
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(protectFromReverseHttp);
app.use(rateLimiter);
app.use(speedLimiter);
app.use(preventDuplicateWrites);
app.use(browserOnly);
app.use((request, response, next) => {
  if (request.method === "GET" || request.path === "/csrf-token" || request.path === "/google" || request.path === "/google/callback" || request.path === "/cron") {
    return next();
  }
  return csrfProtection(request, response, next);
});
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/car", carRoutes);
app.use(googleRoutes);
app.use(aiRoutes);
app.get("/protect-server", validateWhitelist({ body: [], query: [], params: [] }), (request, response) =>
  response.status(200).json({ success: true })
);
app.get("/cron", validateWhitelist({ body: [], query: [], params: [] }), (request, response) =>
  response.status(200).json({ message: "Cron job is working", success: true })
);
app.get("/csrf-token", validateWhitelist({ body: [], query: [], params: [] }), csrf);
if (process.env.NODE_ENV === "production") job.start();
connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        chalk.blueBright.bold("✓"),
        chalk.blueBright.bold(
          `Server running at: http://localhost:${process.env.PORT}`
        )
      );
      console.log(
        chalk.cyan("★"),
        chalk.cyan(
          process.env.NODE_ENV === "development"
            ? "Ready for development"
            : "Ready for production"
        )
      );
      console.log(chalk.yellow("► Security layers activated"));
    });
  })
  .catch((error) => console.log(chalk.red(`${error}`)));