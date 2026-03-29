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
const router = express.Router();
router.put("/update-user", verifyUser, updateUser);
router.put("/update-profile", verifyUser,photoUpload.single('image'), updateProfilePhoto);
router.get("/check", verifyUser, checkAuth);
router.post("/logout", verifyUser, logout);
router.post("/login", blockUser, login);
router.post("/register", blockUser, register);
router.get("/check-page/:verificationToken", blockUser, checkPage);
router.post("/resend-code", blockUser, resendCode);
router.post("/check-code", blockUser, checkCode);
router.post("/reset-password", blockUser, resetPassword);
router.post("/confirm-password/:token", blockUser, resetPasswordConfirm);
router.get("/check-reset-password-page/:token", blockUser, checkResetPasswordPage);
export default router;