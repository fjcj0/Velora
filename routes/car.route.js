import express from "express";
import { photoUpload } from "../middleware/photoUpload.js";
import { blockUser, verifyUser } from "../middleware/user.guard.js";
import { createCar, deleteCar } from "../controllers/car.controller.js";
const router = express.Router();
router
  .route("/")
  .post(blockUser, photoUpload.single("image"), createCar)
  .delete(verifyUser, deleteCar);

export default router;
