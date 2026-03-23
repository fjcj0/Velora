import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import crypto from "crypto";
export const checkAuth = async (request, response) => {
  try {
    if (request.user) {
      return response.status(200).json({
        success: true,
        user: request.user,
      });
    }
    return response.status(401).json({
      success: false,
      error: "401 unauthorized user",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
    });
  }
};
export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "user or password invalid" });
    }
    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      return response.status(400).json({ message: "user or password invalid" });
    }
    if (user.isVerified) {
      await generateTokenAndSetCookie(response, user);
      return response.status(200).json({
        success: true,
        user: { ...user._doc, password: undefined },
      });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verficationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expiredAt = new Date(Date.now() + 60 * 60 * 1000);
    const resendAfter = new Date(Date.now() + 60 * 1000);
    user.verificationCode = verficationCode;
    user.verificationToken = verificationToken;
    user.expiredAt = expiredAt;
    user.resendAfter = resendAfter;
    await user.save();
    return response.status(201).json({
      success: true,
      messag: `The code has been sent to your email, Check it`,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
    });
  }
};
export const register = async (request, response) => {
  try {
    const { name, email, password, username } = request.body;
    if (!email || !password || !username || !name) {
      return response.status(400).json({ message: "all fields are required" });
    }
    if (password.length < 6) {
      return response
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verficationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expiredAt = new Date(Date.now() + 60 * 60 * 1000);
    const resendAfter = new Date(Date.now() + 60 * 1000);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
      verficationCode,
      verificationToken,
      expiredAt,
      resendAfter,
    });
    await newUser.save();
    return response.status(201).json({
      success: true,
      messag: `The code has been sent to your email, Check it`,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
    });
  }
};

export const verificationToken = async (request, response) => {
  try {
    const { token } = request.query;
    if (!token) {
      return response.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return response.status(400).json({ message: "invalid token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.expiredAt = null;
    await user.save();
    response.json({ message: "email verifid successfully" });
  } catch (error) {
    response.status(500).json({ message: "server error" });
  }
};

export const verificationCode = async (request, response) => {
  try {
    const { email, code } = request.body;
    if (!code) {
      return response.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "invalid token" });
    }

    if (user.verificationCode != Number(code)) {
      return response.status(400).json({ message: " invalid code" });
    }

    if (user.expiredAt < new Date()) {
      return response.status(400).json({ message: " token expired" });
    }
    user.isVerified = true;
    user.verificationCode = null;
    user.expiredAt = null;
    await user.save();
    response.json({ message: "email verifid successfully" });
  } catch (error) {
    response.status(500).json({ message: "server error" });
  }
};
