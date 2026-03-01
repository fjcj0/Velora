import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.js"; // صح ✅
import connectToDB from "./config/contect.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

connectToDB();
app.get("/test", (res, req) => {
  return res.status(200).json({
    success: true,
  });
});

app.use("/auth", authRoutes);
app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Server is running at: http://localhost:${process.env.PORT}`),
);