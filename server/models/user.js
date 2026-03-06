import mongoose from "mongoose";
import Joi, { func } from "joi";
import jwt from "jsonwebtoken";
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

export const validateLoginUser = (obj) => {
  const Schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email,
    password: Joi.string().min(5).max(100).required(),
  });
  return Schema.validate(obj);
};

export const validationRegister = (obj) => {
  const Schema = Joi.Schema({
    useremail: Joi.string().min(5).max(100),
    email: Joi.string().min(5).max(100).required().email,
    password: Joi.string().min(5).max(100).required(),
  });
  return Schema.validate(obj);
};

export const validationUpdate = (obj) => {
  const Schema = Joi.Schema({
    useremail: Joi.string().min(5).max(100),
    password: Joi.string().min(5).max(100).required(),
    bio: Joi.string(),
  });
  return Schema.validate(obj);
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id, isAdmin: this.admin },
    process.env.JWT_SECRET,
  );
  return token;
};
export const User = mongoose.model("User", UserSchema);
