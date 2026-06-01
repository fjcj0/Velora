import { Booking } from "../models/book.model.js";
import mongoose from "mongoose";
import { deleteRedis, getRedis, setRedis } from "../utils/redis.utils.js";

export const CreateBookingCar = async (req, res) => {
  try {
    const { carId, total, numberOfDay } = req.body;

    if (!carId || !total || !numberOfDay) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        message: "Invalid carId",
      });
    }

    const startedAt = new Date();
    const endAt = new Date(startedAt);
    endAt.setDate(endAt.getDate() + numberOfDay);

    const booking = await Booking.create({
      carId,
      userId: req.user.id,
      startedAt,
      endAt,
      total,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        message: "Invalid carId",
      });
    }
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await Booking.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting booking",
      error: error.message,
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const bookingCar = await Booking.find();
    res.status(200).json(bookingCar);
  } catch (error) {
    res.status(500).json(error);
  }
};
