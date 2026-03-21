import express from "express";
import { checkAuth, login, register } from "../controllers/auth.controller.js"; 
import { verifyUser } from "../middleware/user.guard.js";
const router = express.Router();
router.post("/login", login);
router.post("/register", register);
router.get("/check", verifyUser, checkAuth);
export default router;