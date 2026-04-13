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
    body: {
      brand: "string",
      model: "string",
      year: "number",
      price: "number",
      category: "string",
      fuel: "string",
      capacity: "number",
      location: "string",
      description: "string",
      transmission: "string"
    }
  }),
  verifyAdmin,
  createCar
);
router.delete(
  "/delete-car/:id",
  validateWhitelist({
    params: {
      id: "string"
    }
  }),
  verifyAdmin,
  deleteCar
);
router.put(
  "/update-car/:id",
  photoUpload.single("image"),
  validateWhitelist({
    body: {
      brand: "string",
      model: "string",
      year: "number",
      price: "number",
      category: "string",
      fuel: "string",
      capacity: "number",
      location: "string",
      description: "string",
      transmission: "string"
    },
    params: {
      id: "string"
    }
  }),
  verifyAdmin,
  updateCar
);
router.get(
  "/get-car/:id",
  validateWhitelist({
    params: {
      id: "string"
    }
  }),
  verifyUser,
  getSingleCar
);
router.get(
  "/get-cars",
  validateWhitelist({
    body: {},
    query: {},
    params: {}
  }),
  verifyUser,
  getAllCar
);
export default router;