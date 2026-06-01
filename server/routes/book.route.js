import express from "express";
import {
  CreateBookingCar,
  deleteBooking,
  getAllBooking,
  getUserBookings,
  confirmBooking,
  cancelBooking,
} from "../controllers/book.controller.js";
import { verifyAdmin } from "../middleware/admin.guard.js";
import { verifyUser } from "../middleware/user.guard.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.post(
  "/create-booking-car",
  validateWhitelist({
    body: {
      carId: "string",
      total: "number",
      numberOfDay: "number",
    },
    params: {},
    query: {},
  }),
  verifyUser,
  CreateBookingCar,
);
router.get(
  "/user-bookings",
  validateWhitelist({
    body: {},
    params: {},
    query: {},
  }),
  verifyUser,
  getUserBookings,
);
router.get(
  "/all-bookings",
  validateWhitelist({
    body: {},
    params: {},
    query: {},
  }),
  verifyAdmin,
  getAllBooking,
);
router.put(
  "/cancel-booking/:id",
  validateWhitelist({
    body: {},
    params: {
      id: "string",
    },
    query: {},
  }),
  verifyUser,
  cancelBooking,
);
router.put(
  "/confirm-booking/:id",
  validateWhitelist({
    body: {},
    params: {
      id: "string",
    },
    query: {},
  }),
  verifyAdmin,
  confirmBooking,
);
router.delete(
  "/delete-booking-car/:id",
  validateWhitelist({
    body: {},
    params: {
      id: "string",
    },
    query: {},
  }),
  verifyAdmin,
  deleteBooking,
);
export default router;