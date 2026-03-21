import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const checkAuth = async (request, response) => {
  try {

  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
    });
  }
};
export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "user or password invalid" });
    }
    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      return response.status(400).json({ message: "user or password invalid" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
export const register = async (request, response) => {
  try {
    const { email, password, username } = request.body;
    if (!email || !password || !username) {
      return response.status(400).json({ message: "all fields are required" });
    }
    if (password.length < 6) {
      return response.status(400).json({ message: "password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    const { password: removedPassword, ...userWithoutPassword } = newUser._doc;
    const token = newUser.generateToken();
    return response.status(201).json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};