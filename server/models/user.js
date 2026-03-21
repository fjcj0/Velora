import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      uniqeu: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    bio: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    verficationToken: String,
    verficationCode: Number,
    expiredAt: Date,
    resendAfter: Date,
    isVerified: Boolean,
  },
  { timestamps: true },
);
export const User = mongoose.model("User", UserSchema);