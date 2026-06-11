import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Car } from '../models/car.model.js';
import { uploadPicture } from "../utils/cloudinary.utils.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, "CARS");
const fakeCars = [
  {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 80,
    category: "Sedan",
    fuel: "Hybrid",
    capacity: 5,
    location: "Nablus",
    description: "Comfortable family car",
    transmission: "Automatic",
    imageFile: "1.webp",
  },
  {
    brand: "BMW",
    model: "X5",
    year: 2023,
    price: 150,
    category: "SUV",
    fuel: "Gas",
    capacity: 5,
    location: "Ramallah",
    description: "Luxury SUV",
    transmission: "Automatic",
    imageFile: "2.webp",
  },
  {
    brand: "Mercedes",
    model: "Sprinter",
    year: 2021,
    price: 120,
    category: "Van",
    fuel: "Diesel",
    capacity: 12,
    location: "Hebron",
    description: "Large passenger van",
    transmission: "Manual",
    imageFile: "3.webp",
  },
  {
    brand: "Tesla",
    model: "Model 3",
    year: 2024,
    price: 200,
    category: "Sedan",
    fuel: "Electric",
    capacity: 5,
    location: "Jerusalem",
    description: "Electric future car",
    transmission: "Automatic",
    imageFile: "4.webp",
  },
  {
    brand: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 90,
    category: "SUV",
    fuel: "Gas",
    capacity: 5,
    location: "Nablus",
    description: "Reliable SUV",
    transmission: "Automatic",
    imageFile: "5.webp",
  },
];
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB connected");
};
const seedCars = async () => {
  try {
    await connectDB();
    fs.readdirSync(imagesDir);
    for (const car of fakeCars) {
      const existing = await Car.findOne({
        brand: car.brand,
        model: car.model,
        year: car.year,
      });
      if (existing) {
        console.log(`⏭ Skipped: ${car.brand} ${car.model}`);
        continue;
      }
      const imagePath = path.join(imagesDir, car.imageFile);
      const buffer = fs.readFileSync(imagePath);
      const uploaded = await uploadPicture(buffer);
      await Car.create({
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: car.price,
        category: car.category,
        fuel: car.fuel,
        capacity: car.capacity,
        location: car.location,
        description: car.description,
        transmission: car.transmission,
        image: uploaded.url,
        public_id: uploaded.public_id,
      });
      console.log(`Inserted: ${car.brand} ${car.model}`);
    }
    console.log("Seeding finished");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};
seedCars();