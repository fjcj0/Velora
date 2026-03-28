import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.utils.js";
import crypto from "crypto";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../email/email.js";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  usernameRegex,
} from "../auth.regax.js";
import { deleteRedis } from "../utils/redis.utils.js";
import { deletePicture, uploadPicture } from "../utils/cloudinary.utils.js";
import { request } from "http";
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
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ success: false, error: "email and password are required" });
    }
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }
    if (!passwordRegex.test(password)) {
      return response.status(400).json({
        success: false,
        error:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(401)
        .json({ success: false, error: "user or password invalid" });
    }
    const isPassWordMatched = await bcrypt.compare(password, user.password);
    if (!isPassWordMatched) {
      return response
        .status(401)
        .json({ success: false, error: "user or password invalid" });
    }
    if (user.isVerified) {
      await generateTokenAndSetCookie(response, user);
      const { password, verificationToken, verificationCode, ...safeUser } =
        user._doc;
      return response.status(200).json({
        success: true,
        user: safeUser,
      });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    user.verificationCode = verificationCode;
    user.verificationToken = verificationToken;
    user.expiredAt = new Date(Date.now() + 60 * 60 * 1000);
    user.resendAfter = new Date(Date.now() + 60 * 1000);
    await user.save();
    await sendVerificationEmail(email, verificationCode);
    return response.status(200).json({
      success: true,
      message: `The code has been sent to your email, Check it`,
      verificationToken,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const register = async (request, response) => {
  try {
    const { name, email, password, username, confirm_password } = request.body;
    if (!email || !password || !username || !name || !confirm_password) {
      return response
        .status(400)
        .json({ success: false, error: "all fields are required" });
    }
    if (confirm_password !== password) {
      return response.status(400).json({
        success: false,
        error: "The passwords are not the same",
      });
    }
    if (!nameRegex.test(name)) {
      return response.status(400).json({
        success: false,
        error:
          "Name must be 1 to 4 words, each at least 3 letters, using Arabic or English letters only.",
      });
    }
    if (!usernameRegex.test(username)) {
      return response.status(400).json({
        success: false,
        error:
          "Username must start with a letter, be at least 4 characters, and can include letters, numbers, underscores or dots.",
      });
    }
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }
    if (!passwordRegex.test(password)) {
      return response.status(400).json({
        success: false,
        error:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return response
        .status(400)
        .json({ success: false, error: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expiredAt = new Date(Date.now() + 60 * 60 * 1000);
    const resendAfter = new Date(Date.now() + 60 * 1000);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
      verificationCode,
      verificationToken,
      expiredAt,
      resendAfter,
    });
    await newUser.save();
    await sendVerificationEmail(email, verificationCode);
    return response.status(201).json({
      success: true,
      message: `The code has been sent to your email, Check it`,
      verificationToken,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const checkPage = async (request, response) => {
  try {
    const { verificationToken } = request.params;
    if (!verificationToken) {
      return response
        .status(400)
        .json({ success: false, error: "all fields are required" });
    }
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, error: "invalid token" });
    }
    if (user.expiredAt < new Date()) {
      return response
        .status(400)
        .json({ success: false, error: "token expired" });
    }
    let resendAfterSeconds = 0;
    if (user.resendAfter) {
      const diff = user.resendAfter.getTime() - Date.now();
      resendAfterSeconds = diff > 0 ? Math.ceil(diff / 1000) : 0;
    }
    return response.status(200).json({
      success: true,
      resendAfterSeconds,
      message: "Token verified successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const checkCode = async (request, response) => {
  try {
    const { verificationCode, verificationToken } = request.body;
    if (!verificationCode || !verificationToken) {
      return response
        .status(400)
        .json({ success: false, error: "all fields are required" });
    }
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, error: "invalid token" });
    }
    if (user.verificationCode !== verificationCode) {
      return response
        .status(400)
        .json({ success: false, error: "invalid code" });
    }
    if (user.expiredAt < new Date()) {
      return response
        .status(400)
        .json({ success: false, error: "token expired" });
    }
    user.isVerified = true;
    user.verificationCode = null;
    user.expiredAt = null;
    user.resendAfter = null;
    user.verificationToken = null;
    await user.save();
    await generateTokenAndSetCookie(response, user);
    await sendWelcomeEmail(user.email, user.name);
    return response.status(200).json({
      success: true,
      message: "email verified successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const resendCode = async (request, response) => {
  try {
    const { verificationToken } = request.body;
    if (!verificationToken) {
      return response
        .status(400)
        .json({ success: false, error: "all fields are required" });
    }
    const user = await User.findOne({ verificationToken });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, error: "invalid token" });
    }
    if (user.resendAfter && user.resendAfter.getTime() > Date.now()) {
      return response
        .status(400)
        .json({ success: false, error: "Wait 60 seconds" });
    }
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    user.resendAfter = new Date(Date.now() + 60 * 1000);
    user.expiredAt = new Date(Date.now() + 60 * 60 * 1000);
    user.verificationCode = verificationCode;
    await user.save();
    await sendVerificationEmail(user.email, verificationCode);
    return response.status(200).json({
      success: true,
      message: `The code has been sent successfully to your email`,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const logout = async (request, response) => {
  try {
    await deleteRedis(request.user._id);
    response.clearCookie("token");
    return response.status(200).json({
      success: true,
      message: "you have been logged out successfully!!",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};

export const resetPassword = async (request, response) => {
  try {
    const { email } = request.body;
    if (!email) {
      return response
        .status(400)
        .json({ success: false, error: "email is required" });
    }

    if (!emailRegex.test(email)) {
      return response.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(200).json({
        success: true,
        message: "If this email exists, a reset link has been sent",
      });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetURL = `${CLIENT_URL}/reset-password/${resetPasswordToken}`;
    await sendPasswordResetEmail(user.email, resetURL);
    return response.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};

export const resetPasswordConfirm = async (request, response) => {
  try {
    const { token } = request.params;
    const { password } = request.body;

    if (!password) {
      return response.status(400).json({
        success: false,
        error: "Password is required",
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return response.status(400).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
    if (user.resetPasswordExpires.getTime() < new Date()) {
      return response
        .status(400)
        .json({ success: false, error: "token expired" });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return response.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
export const checkResetPasswordPage = async (request, response) => {
  try {
    const { token } = request.params;

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return response.status(400).json({
        success: false,
        error: "Invalid or expired token",
      });
    }
    if (user.resetPasswordExpires.getTime() < new Date()) {
      return response
        .status(400)
        .json({ success: false, error: "token expired" });
    }

    await user.save();

    return response.status(200).json({
      success: true,
      message: token,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};

export const updateUser = async (request, response) => {
  try {
    const { userId } = request.params;

    if (request.user.id != userId) {
      return response.status(403).json({ message: "Not authorized" });
    }

    const { name, username, email, profilePhoto, bio } = request.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (profilePhoto) updateFields.profilePhoto = profilePhoto;
    if (bio) updateFields.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return response.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return response.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
    });
  }
};

export const updateProfilePhoto = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).json({ message: "No file provided" });
    }

    const imagePath = path.join(
      __dirname,
      `../images/${request.file.filename}`,
    );

    const result = await uploadPicture(imagePath);

    const user = await User.findById(request.user.id);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    if (user.profilePhoto && user.profilePhoto.publicId) {
      await deletePicture(user.profilePhoto.publicId);
    }

    user.profilePhoto = {
      url: result.secure_url,
      publicId: result.publicId,
    };
    await user.save();

    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    return response.status(200).json({
      success: true,
      message: "Your profile photo uploaded successfully",
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: `Internal Server Error: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};
