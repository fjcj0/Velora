const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    carId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endAt: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Out Of Date", "Cancelled", "Confirmed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
