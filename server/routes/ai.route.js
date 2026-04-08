import express from "express";
import { verifyUser } from "../middleware/user.guard.js";
import { checkAiAccess } from "../middleware/ai.guard.js";
import { AskAi } from "../controllers/ai.controller.js";
import { verifyAdmin } from "../middleware/admin.guard.js";
const router = express.Router();
router.post('/ask-ai-user', verifyUser, checkAiAccess, AskAi);
router.post('/ask-ai-admin', verifyAdmin, checkAiAccess, AskAi);
export default router;