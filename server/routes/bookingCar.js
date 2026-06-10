import express from "express";
import {
  CreateBookingCar,
  deleteBooking,
  getAllBooking,
} from "../controllers/bookingCar.controller.js";
import { verifyAdmin } from "../middleware/admin.guard.js";
import { verifyUser } from "../middleware/user.guard.js";
import { photoUpload } from "../utils/multer.utils.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.post(
  "/create-booking-car",
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
      transmission: "string",
    },
  }),
  verifyUser,

  CreateBookingCar,
);
router.delete(
  "/delete-booking-car/:id",
  validateWhitelist({
    params: {
      id: "string",
    },
  }),
  verifyAdmin,
  verifyUser,
  deleteBooking,
);

router.get("/get-booking-car", getAllBooking);
export default router;
