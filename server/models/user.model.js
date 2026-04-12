import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePhoto: {
    type: String,
    default: "/user.png",
  },
  bio: {
    type: String,
    maxlength: 100,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationCode: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  expiredAt: Date,
  resendAfter: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);