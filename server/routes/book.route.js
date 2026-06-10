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

router.post(
  "/create-booking-checkout",
  verifyToken("user"),
  createBookingCheckout,
);
route.get("/booking-success", async (request, response) => {
  try {
    const { carId, days, userId } = request.query;

    const car = await Car.findById(carId);

    const startedAt = new Date();

    const endAt = new Date(startedAt);

    endAt.setDate(endAt.getDate() + Number(days));

    const total = car.pricePerDay * Number(days);

    const booking = await Booking.create({
      carId,
      userId,
      startedAt,
      endAt,
      total,
      status: "Confirmed",
    });

    return response.redirect(`${process.env.CLIENT_URL}/booking-success`);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
});
export default router;
