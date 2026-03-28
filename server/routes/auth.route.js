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
const router = express.Router();
router.post("/login", blockUser, login);
router.post("/register", blockUser, register);
router.get("/check", verifyUser, checkAuth);
router.get("/check-page/:verificationToken", blockUser, checkPage);
router.post("/resend-code", blockUser, resendCode);
router.post("/check-code", blockUser, checkCode);
router.post("/logout", verifyUser, logout);
router.post("/reset-password", verifyUser, resetPassword);
router.post("/confirm-password/:token", verifyUser, resetPasswordConfirm);
router.put("/update-user", verifyUser, updateUser);
router.put("/update-user-image", verifyUser, updateProfilePhoto);
router.get("/check-reset-password-page", verifyUser, checkResetPasswordPage);
export default router;