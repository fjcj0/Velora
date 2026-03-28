import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_640.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
      maxlength: 100,
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
    resetPasswordExpires: Date,
  },
  { timestamps: true },
);
export const User = mongoose.model("User", userSchema);
