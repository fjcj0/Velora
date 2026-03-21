import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.route.js";
import connectToDB from "./config/connect.js";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/auth", authRoutes);
app.get("/test", (res, req) => {
  return res.status(200).json({
    success: true,
  });
});
connectToDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(chalk.green('✓'), chalk.blueBright.bold(`Server running at: http://localhost:${process.env.PORT}`));
    console.log(chalk.yellow('★'), chalk.cyan(process.env.NODE_ENV == 'development' ? 'Ready for development' : 'Ready for using'));
    console.log(chalk.yellow('DDoS protection activated for protected routes only'));
});
}).catch((error) => {
  console.log(chalk.red(`${error}`));
});