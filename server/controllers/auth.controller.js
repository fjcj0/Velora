import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
export const checkAuth = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user or password invalid" });
    }
    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      return res.status(400).json({ message: "user or password invalid" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "all fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
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
    return res.status(201).json({
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};