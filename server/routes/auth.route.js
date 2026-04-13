import express from "express";
import {
  login,
  register,
  logout,
  updateUser,
  checkAuth,
  resendCode,
  checkCode,
  resetPassword,
  resetPasswordConfirm,
  checkPage,
  checkResetPasswordPage,
  updateProfilePhoto
} from "../controllers/auth.controller.js";
import { verifyUser, blockUser } from "../middleware/user.guard.js";
import { photoUpload } from "../utils/multer.utils.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.put(
  "/update-user",
  validateWhitelist({
    body: {
      name: "string",
      username: "string",
      bio: "string"
    }
  }),
  verifyUser,
  updateUser
);
router.put(
  "/update-profile",
  photoUpload.single("image"),
  validateWhitelist({
    body: {}
  }),
  verifyUser,
  updateProfilePhoto
);
router.get(
  "/check",
  validateWhitelist({
    body: {},
    query: {},
    params: {}
  }),
  verifyUser,
  checkAuth
);
router.post(
  "/logout",
  validateWhitelist({
    body: {},
    query: {},
    params: {}
  }),
  verifyUser,
  logout
);
router.post(
  "/login",
  validateWhitelist({
    body: {
      email: "string",
      password: "string"
    }
  }),
  blockUser,
  login
);
router.post(
  "/register",
  validateWhitelist({
    body: {
      name: "string",
      email: "string",
      password: "string",
      username: "string",
      confirm_password: "string"
    }
  }),
  blockUser,
  register
);
router.get(
  "/check-page/:verificationToken",
  validateWhitelist({
    params: {
      verificationToken: "string"
    }
  }),
  blockUser,
  checkPage
);
router.post(
  "/resend-code",
  validateWhitelist({
    body: {
      verificationToken: "string"
    }
  }),
  blockUser,
  resendCode
);
router.post(
  "/check-code",
  validateWhitelist({
    body: {
      verificationCode: "string",
      verificationToken: "string"
    }
  }),
  blockUser,
  checkCode
);
router.post(
  "/reset-password",
  validateWhitelist({
    body: {
      email: "string"
    }
  }),
  blockUser,
  resetPassword
);
router.post(
  "/confirm-password/:token",
  validateWhitelist({
    body: {
      password: "string"
    },
    params: {
      token: "string"
    }
  }),
  blockUser,
  resetPasswordConfirm
);
router.get(
  "/check-reset-password-page/:token",
  validateWhitelist({
    params: {
      token: "string"
    }
  }),
  blockUser,
  checkResetPasswordPage
);
export default router;