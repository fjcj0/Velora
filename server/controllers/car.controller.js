import { Car } from "../models/car.model.js";
import mongoose from "mongoose";
import { uploadPicture, deletePicture } from "../utils/cloudinary.utils.js";
import { deleteRedis, getRedis, setRedis } from "../utils/redis.utils.js";
export const createCar = async (request, response) => {
  try {
    const { brand, model, year, price, category, fuel, capacity, location, description, transmission } = request.body;
    if (!request.file || !brand || !model || !year || !price || !category || !fuel || !capacity || !location || !description || !transmission) {
      return response.status(400).json({ message: "All fields are required" });
    }
    const uploadedImage = await uploadPicture(request.file.buffer);
    if (!uploadedImage) return response.status(500).json({ success: false, error: "Failed to upload image" });
    const newCar = new Car({
      image: uploadedImage.url,
      public_id: uploadedImage.public_id,
      brand, model, year, price, category, fuel, capacity, location, description, transmission
    });
    const result = await newCar.save();
    await setRedis(result._id.toString(), result);
    let cars = await getRedis("cars");
    cars = cars ? cars : [];
    cars.push(result);
    await setRedis("cars", cars);
    return response.status(201).json({ success: true, data: result });
  } catch (error) {
    return response.status(500).json({ success: false, error: `Internal Server Error: ${error instanceof Error ? error.message : error}` });
  }
};
export const deleteCar = async (request, response) => {
  try {
    if (!request.user.isAdmin) return response.status(401).json({ success: false, error: "Unauthorized user" });
    const deletedCar = await Car.findByIdAndDelete(request.params.id);
    if (!deletedCar) return response.status(404).json({ message: "Car Not Found" });
    if (deletedCar.public_id) await deletePicture(deletedCar.public_id);
    await deleteRedis(request.params.id);
    let cars = await getRedis("cars");
    if (cars) {
      cars = cars.filter(car => car._id.toString() !== request.params.id);
      await setRedis("cars", cars);
    }
    return response.status(200).json({ success: true, data: deletedCar });
  } catch (error) {
    return response.status(500).json({ success: false, error: `Internal Server Error: ${error instanceof Error ? error.message : error}` });
  }
};
export const getAllCar = async (request, response) => {
  try {
    let cars = await getRedis("cars");
    if (!cars) {
      cars = await Car.find();
      await setRedis("cars", cars);
    }
    return response.status(200).json({ success: true, data: cars });
  } catch (error) {
    return response.status(500).json({ success: false, error: `Internal Server Error: ${error instanceof Error ? error.message : error}` });
  }
};
export const getSingleCar = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ message: "Invalid Car ID" });
    let car = await getRedis(id);
    if (!car) {
      car = await Car.findById(id);
      if (!car) return response.status(404).json({ message: "Car Not Found" });
      await setRedis(id, car);
    }
    return response.status(200).json({ success: true, data: car });
  } catch (error) {
    return response.status(500).json({ success: false, error: `Internal Server Error: ${error instanceof Error ? error.message : error}` });
  }
};
export const updateCar = async (request, response) => {
  try {
    const { id } = request.params;
    if (!request.user.isAdmin) return response.status(401).json({ success: false, error: "Unauthorized user" });
    if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ message: "Invalid Car ID" });
    const car = await Car.findById(id);
    if (!car) return response.status(404).json({ message: "Car Not Found" });
    let uploadedImage;
    if (request.file) {
      if (car.public_id) await deletePicture(car.public_id);
      uploadedImage = await uploadPicture(request.file.buffer);
      if (!uploadedImage) return response.status(500).json({ message: "Failed to upload image" });
    }
    const updateData = {
      ...(uploadedImage && { image: uploadedImage.url, public_id: uploadedImage.public_id }),
      ...(request.body.brand && { brand: request.body.brand }),
      ...(request.body.model && { model: request.body.model }),
      ...(request.body.year && { year: request.body.year }),
      ...(request.body.price && { price: request.body.price }),
      ...(request.body.category && { category: request.body.category }),
      ...(request.body.fuel && { fuel: request.body.fuel }),
      ...(request.body.capacity && { capacity: request.body.capacity }),
      ...(request.body.location && { location: request.body.location }),
      ...(request.body.description && { description: request.body.description }),
      ...(request.body.transmission && { transmission: request.body.transmission }),
    };
    const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });
    await setRedis(updatedCar._id.toString(), updatedCar);
    let cars = await getRedis("cars");
    if (cars) {
      cars = cars.map(car => car._id.toString() === id ? updatedCar : car);
      await setRedis("cars", cars);
    }
    return response.status(200).json({ success: true, data: updatedCar });
  } catch (error) {
    return response.status(500).json({ success: false, error: `Internal Server Error: ${error instanceof Error ? error.message : error}` });
  }
};