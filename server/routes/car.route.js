import express from "express";
import {
  createCar,
  deleteCar,
  getAllCar,
  getSingleCar,
  updateCar
} from "../controllers/car.controller.js";
import { verifyAdmin } from "../middleware/admin.guard.js";
import { verifyUser } from "../middleware/user.guard.js";
import { photoUpload } from "../utils/multer.utils.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.post(
  "/add-car",
  photoUpload.single("image"),
  validateWhitelist({
    body: ["brand","model","year","price","category","fuel","capacity","location","description","transmission"],
    query: [],
    params: []
  }),
  verifyAdmin,
  createCar
);
router.delete(
  "/delete-car/:id",
  validateWhitelist({
    body: [],
    query: [],
    params: ["id"]
  }),
  verifyAdmin,
  deleteCar
);
router.put(
  "/update-car/:id",
  photoUpload.single("image"),
  validateWhitelist({
    body: ["brand","model","year","price","category","fuel","capacity","location","description","transmission"],
    query: [],
    params: ["id"]
  }),
  verifyAdmin,
  updateCar
);
router.get(
  "/get-car/:id",
  validateWhitelist({
    body: [],
    query: [],
    params: ["id"]
  }),
  verifyUser,
  getSingleCar
);
router.get(
  "/get-cars",
  validateWhitelist({
    body: [],
    query: [],
    params: []
  }),
  verifyUser,
  getAllCar
);
export default router;