import express from "express";
import { checkAiAccess } from "../middleware/ai.guard.js";
import { AskAi } from "../controllers/ai.controller.js";
import { verifyUser } from "../middleware/user.guard.js";
const router = express.Router();
router.post('/ask-ai',verifyUser,checkAiAccess, AskAi);
export default router;