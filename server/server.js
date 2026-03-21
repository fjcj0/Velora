import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import connectToDB from "./config/connect.config.js";
import { browserOnly, csrfProtection, rateLimiter, speedLimiter, xss_protection } from "./middleware/server.guard.js";
import { csrf } from "./controllers/csrf.controller.js";
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(browserOnly);
app.use(rateLimiter);
app.use(speedLimiter);
app.use((request, response, next) => {
    if (request.path === "/test" || request.path === "/csrf-token") {
        return next();
    }
    return csrfProtection(request, response, next);
});
morgan.token('client-ip', (request) => request.ip || request.connection.remoteAddress);
app.use(morgan('➜ :method :url :status :response-time ms - :res[content-length] - :client-ip'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(xss_protection);
app.use("/auth", authRoutes);
app.get("/test", (req, res) => {
    return res.status(200).json({ success: true });
});
app.get("/csrf-token", csrf);
connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(chalk.green('✓'), chalk.blueBright.bold(`Server running at: http://localhost:${process.env.PORT}`));
            console.log(chalk.yellow('★'), chalk.cyan(process.env.NODE_ENV === 'development' ? 'Ready for development' : 'Ready for production'));
            console.log(chalk.yellow('DDoS protection activated for protected routes only'));
        });
    })
    .catch((error) => console.log(chalk.red(`${error}`)));