import mongoose from "mongoose";
const carSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  public_id: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  model: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 30,
  },
  year: {
    type: Number,
    required: true,
    min: 1886,
    max: new Date().getFullYear() + 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
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
    min: 1,
    max: 20,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 100,
    trim: true,
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
    min: 0,
  },
}, { timestamps: true });
export const Car = mongoose.model("Car", carSchema);