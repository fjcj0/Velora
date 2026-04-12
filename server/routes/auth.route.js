import express from "express";
import {
  checkAuth,
  checkCode,
  checkPage,
  checkResetPasswordPage,
  login,
  logout,
  register,
  resendCode,
  resetPassword,
  resetPasswordConfirm,
  updateProfilePhoto,
  updateUser,
} from "../controllers/auth.controller.js";
import { blockUser, verifyUser } from "../middleware/user.guard.js";
import { photoUpload } from "../utils/multer.utils.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.put(
  "/update-user",
  validateWhitelist({
    body: ["name", "username", "bio"],
    query: [],
    params: []
  }),
  verifyUser,
  updateUser
);
router.put(
  "/update-profile",
  photoUpload.single("image"), 
  validateWhitelist({
    body: [],
    query: [],
    params: []
  }),
  verifyUser,
  updateProfilePhoto
);
router.get(
  "/check",
  validateWhitelist({ body: [], query: [], params: [] }),
  verifyUser,
  checkAuth
);
router.post(
  "/logout",
  validateWhitelist({ body: [], query: [], params: [] }),
  verifyUser,
  logout
);
router.post(
  "/login",
  validateWhitelist({
    body: ["email", "password"],
    query: [],
    params: []
  }),
  blockUser,
  login
);
router.post(
  "/register",
  validateWhitelist({
    body: ["name", "email", "password", "username", "confirm_password"],
    query: [],
    params: []
  }),
  blockUser,
  register
);
router.get(
  "/check-page/:verificationToken",
  validateWhitelist({
    body: [],
    query: [],
    params: ["verificationToken"]
  }),
  blockUser,
  checkPage
);
router.post(
  "/resend-code",
  validateWhitelist({
    body: ["verificationToken"],
    query: [],
    params: []
  }),
  blockUser,
  resendCode
);
router.post(
  "/check-code",
  validateWhitelist({
    body: ["verificationCode", "verificationToken"],
    query: [],
    params: []
  }),
  blockUser,
  checkCode
);
router.post(
  "/reset-password",
  validateWhitelist({
    body: ["email"],
    query: [],
    params: []
  }),
  blockUser,
  resetPassword
);
router.post(
  "/confirm-password/:token",
  validateWhitelist({
    body: ["password"],
    query: [],
    params: ["token"]
  }),
  blockUser,
  resetPasswordConfirm
);
router.get(
  "/check-reset-password-page/:token",
  validateWhitelist({
    body: [],
    query: [],
    params: ["token"]
  }),
  blockUser,
  checkResetPasswordPage
);
export default router;