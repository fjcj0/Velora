const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Sedan", "SUV", "Van"],
      required: true,
    },
    fuel: {
      type: String,
      enum: ["Gas", "Diesel", "Petrol", "Electric", "Hybrid"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual", "Semi-Automatic"],
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Car", carSchema);
