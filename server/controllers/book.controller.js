import { Booking } from "../models/book.model.js";
import {
  getRedis,
  setRedis,
  clearRedisByPattern,
} from "../utils/redis.utils.js";
export const CreateBookingCar = async (request, response) => {
  try {
    const { carId, total, numberOfDay } = request.body;
    if (!carId || !total || !numberOfDay) {
      return response.status(400).json({
        message: "All fields are required",
      });
    }
    const startedAt = new Date();
    const endAt = new Date(startedAt);
    endAt.setDate(endAt.getDate() + numberOfDay);
    const booking = await Booking.create({
      carId,
      userId: request.user._id,
      startedAt,
      endAt,
      total,
    });
    const userId = request.user._id;
    const cacheKey = `user-bookings:${userId}`;
    const cached = await getRedis(cacheKey);
    if (cached) {
      cached.unshift(booking);
      await setRedis(cacheKey, cached, 300);
    }
    await clearRedisByPattern("all-bookings:*");
    return response.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};
export const cancelBooking = async (request, response) => {
  try {
    const { id } = request.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return response.status(404).json({
        message: "Booking not found",
      });
    }
    if (booking.userId.toString() !== request.user._id) {
      return response.status(403).json({
        message: "Not allowed",
      });
    }
    booking.status = "Cancelled";
    await booking.save();
    const cacheKey = `user-bookings:${request.user._id}`;
    const cached = await getRedis(cacheKey);
    if (cached) {
      const updated = cached.map((b) =>
        b._id.toString() === id
          ? { ...b.toObject(), status: "Cancelled" }
          : b
      );
      await setRedis(cacheKey, updated, 300);
    }
    await clearRedisByPattern("all-bookings:*");
    return response.status(200).json({
      message: "Booking cancelled successfully",
       booking,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};
export const confirmBooking = async (request, response) => {
  try {
    const { id } = request.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return response.status(404).json({
        message: "Booking not found",
      });
    }
    booking.status = "Confirmed";
    await booking.save();
    const cacheKey = `user-bookings:${booking.userId}`;
    const cached = await getRedis(cacheKey);
    if (cached) {
      const updated = cached.map((b) =>
        b._id.toString() === id
          ? { ...b.toObject(), status: "Confirmed" }
          : b
      );
      await setRedis(cacheKey, updated, 300);
    }
    await clearRedisByPattern("all-bookings:*");
    return response.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};
export const deleteBooking = async (request, response) => {
  try {
    const { id } = request.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return response.status(404).json({
        message: "Booking not found",
      });
    }
    await Booking.findByIdAndDelete(id);
    const cacheKey = `user-bookings:${booking.userId}`;
    const cached = await getRedis(cacheKey);
    if (cached) {
      const updated = cached.filter(
        (b) => b._id.toString() !== id
      );
      await setRedis(cacheKey, updated, 300);
    }
    await clearRedisByPattern("all-bookings:*");
    return response.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};
export const getUserBookings = async (request, response) => {
  try {
    const userId = request.user._id;
    const cacheKey = `user-bookings:${userId}`;
    const cached = await getRedis(cacheKey);
    if (cached) {
      return response.status(200).json({
        user_bookings: cached,
        source: "redis",
      });
    }
    const bookings = await Booking.find({ userId })
      .populate("carId")
      .sort({ createdAt: -1 });
    await setRedis(cacheKey, bookings, 300);
    return response.status(200).json({
      user_bookings: bookings,
      source: "db",
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};
export const getAllBooking = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const cacheKey = `all-bookings:${page}:${limit}`;
    const cached = await getRedis(cacheKey);
    if (cached) {
      return response.status(200).json(cached);
    }
    const skip = (page - 1) * limit;
    const bookings = await Booking.find()
      .skip(skip)
      .limit(limit)
      .populate("carId")
      .populate("userId");
    const total = await Booking.countDocuments();
    const result = {
      bookings,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    };
    await setRedis(cacheKey, result, 60);
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({
      message: error.message,
    });
  }
};