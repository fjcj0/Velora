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
import { Booking } from "../models/book.model.js";
import { createBookingCheckout } from "../controllers/stripe.controller.js";
import { getRedis, setRedis, clearRedisByPattern } from "../utils/redis.utils.js";
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
    validateWhitelist({
      body: {
      id: "string"
    },
    params: {},
    query: {},
  }),
  verifyUser,
  createBookingCheckout,
);
router.get("/booking-success", async (request, response) => {
  try {
    const { bookingId, userId } = request.query;
    const booking = await Booking.findOne({
      _id: bookingId,
      userId,
    });
    if (!booking) {
      return response.status(404).json({
        message: "Booking not found",
      });
    }
    booking.status = "Confirmed";
    await booking.save();
    const userCacheKey = `user-bookings:${userId}`;
    const cached = await getRedis(userCacheKey);
    if (cached) {
      const updated = cached.map((b) =>
        b._id.toString() === bookingId
          ? { ...b.toObject?.() || b, status: "Confirmed" }
          : b
      );
      await setRedis(userCacheKey, updated, 60);
    }
    await clearRedisByPattern("all-bookings:*");
    return response.redirect(
      `${process.env.CLIENT_URL}/bookings?success=true`
    );
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
});
export default router;