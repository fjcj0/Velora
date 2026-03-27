import { Car } from "../models/car.model.js";
import mongoose from "mongoose";
const getImagePath = (file) => (file ? file.path : null);
export const createCar = async (request, response) => {
  try {
    const image = getImagePath(request.file);
    const {
      brand,
      model,
      year,
      price,
      category,
      fuel,
      capacity,
      location,
      description,
      transmission,
    } = request.body;
    if (
      !image ||
      !brand ||
      !model ||
      !year ||
      !price ||
      !category ||
      !fuel ||
      !capacity ||
      !location ||
      !description ||
      !transmission
    ) {
      return response.status(400).json({ message: "All fields are required" });
    }
    const newCar = new Car({
      image,
      brand,
      model,
      year,
      price,
      category,
      fuel,
      capacity,
      location,
      description,
      transmission,
    });
    const result = await newCar.save();
    return response.status(201).json({ success: true, data: result });
  } catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
};
export const deleteCar = async (request, response) => {
  try {
    if (!request.user.isAdmin) {
      return response.status(401).json({ success: false, error: "Unauthorized user" });
    }
    const deletedCar = await Car.findByIdAndDelete(request.params.id);
    if (!deletedCar) {
      return response.status(404).json({ message: "Car Not Found" });
    }
    return response.status(200).json({ success: true, data: deletedCar });
  } catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
};
export const getAllCar = async (request, response) => {
  try {
    const cars = await Car.find();
    return response.status(200).json({ success: true, data: cars });
  } catch (error) {
    return response.status(500).json({ success: false, error: error.message });
  }
};
export const getSingleCar = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid Car ID" });
    }
    const car = await Car.findById(id);
    if (!car) {
      return response.status(404).json({ message: "Car Not Found" });
    }
    return response.status(200).json({ success: true, data: car });
  } catch (error) {
    return response.status(500).json({ success: false, error: error.message });
  }
};
export const updateCar = async (request, response) => {
  try {
    const { id } = request.params;
    if (!request.user.isAdmin) {
      return response.status(401).json({ success: false, error: "Unauthorized user" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid Car ID" });
    }
    const image = getImagePath(request.file);
    const {
      brand,
      model,
      year,
      price,
      category,
      fuel,
      capacity,
      location,
      description,
      transmission,
    } = request.body;
    const updateData = {
      ...(image && { image }),
      ...(brand && { brand }),
      ...(model && { model }),
      ...(year && { year }),
      ...(price && { price }),
      ...(category && { category }),
      ...(fuel && { fuel }),
      ...(capacity && { capacity }),
      ...(location && { location }),
      ...(description && { description }),
      ...(transmission && { transmission }),
    };
    const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCar) {
      return response.status(404).json({ message: "Car Not Found" });
    }
    return response.status(200).json({ success: true, data: updatedCar });
  } catch (error) {
    return response.status(500).json({ success: false, message: error.message });
  }
};