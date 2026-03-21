import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import connectToDB from "./config/connect.js";
import cors from 'cors';
import { xss_protection } from "./middleware/server.guard.js";
const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE']
}));
app.use(xss_protection);
app.use("/auth", authRoutes);
app.get("/test", (request, response) => {
  return response.status(200).json({
    success: true,
  });
});
connectToDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(chalk.green('✓'), chalk.blueBright.bold(`Server running at: http://localhost:${process.env.PORT}`));
    console.log(chalk.yellow('★'), chalk.cyan(process.env.NODE_ENV == 'development' ? 'Ready for development' : 'Ready for using'));
    console.log(chalk.yellow('DDoS protection activated for protected routes only'));
  });
})
.catch((error) => {
  console.log(chalk.red(`${error}`));
});