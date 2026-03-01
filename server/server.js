import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.get("/test", (request, response) => {
  return response.status(200).json({
    success: true,
  });
});
app.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Server is running at: http://localhost:${process.env.PORT}`),
);