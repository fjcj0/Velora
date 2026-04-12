import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Expired", "Cancelled", "Confirmed"],
    default: "Pending",
  },
}, { timestamps: true });
export const Booking = mongoose.model("Booking", bookingSchema);