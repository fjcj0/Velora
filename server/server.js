import dotenv from "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.route.js";
import connectToDB from "./config/connect.js";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
connectToDB();
app.listen(process.env.PORT, () => {
        console.log(`Server running at: http://localhost:${process.env.PORT}`);
});
app.get("/test", (res, req) => {
  return res.status(200).json({
    success: true,
  });
});
app.use("/auth", authRoutes);