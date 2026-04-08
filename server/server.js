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
import connectToDB from "./config/connect.config.js";
import {
  browserOnly,
  csrfProtection,
  rateLimiter,
  speedLimiter,
  xss_protection,
} from "./middleware/server.guard.js";
import { csrf } from "./controllers/csrf.controller.js";
import { preventDuplicateWrites } from "./middleware/tokenbucket.guard.js";
import { connectToRedis } from "./config/redis.config.js";
import passport from "./config/passport.config.js";
import googleRoutes from "./routes/google.route.js";
import job from "./config/cron.config.js";
(async () => {
  try {
    await connectToRedis();
  } catch (error) {
    console.error("Redis operation failed:", error);
  }
})();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(helmet());
morgan.token("client-ip", (req) => req.ip || req.connection.remoteAddress);
app.use(
  morgan(
    "➜ :method :url :status :response-time ms - :res[content-length] - :client-ip"
  )
);
app.use(browserOnly);
app.use(rateLimiter);
app.use(speedLimiter);
app.use(preventDuplicateWrites);
app.use(xss_protection);
app.use((request, response, next) => {
  if (request.path === "/csrf-token" || request.path === '/google' || request.path === '/google/callback' || request.path === '/cron') return next();
  return csrfProtection(request, response, next);
});
app.use(passport.initialize());
if(process.env.NODE_ENV !== 'development') job.start();
app.use("/auth", authRoutes);
app.use("/car", carRoutes);
app.use(googleRoutes);
app.get("/protect-server", (request, response) => response.status(200).json({ success: true }));
app.get("/cron", (request, response) => response.status(200).json({ message: 'Cron job is working',success: true }));
app.get("/csrf-token", csrf);
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
      console.log(
        chalk.yellow(
          "► DDoS protection activated for protected routes only"
        )
      );
    });
  })
  .catch((error) => console.log(chalk.red(`${error}`)));