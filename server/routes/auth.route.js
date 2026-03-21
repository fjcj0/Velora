import express from "express";
import { checkAuth, login, register } from "../controllers/auth.controller.js"; 
import { blockUser, verifyUser } from "../middleware/user.guard.js";
const router = express.Router();
router.post("/login",blockUser,login);
router.post("/register",blockUser,register);
router.get("/check", verifyUser, checkAuth);
export default router;