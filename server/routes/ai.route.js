import express from "express";
import { checkAiAccess } from "../middleware/ai.guard.js";
import { AskAi } from "../controllers/ai.controller.js";
import { verifyUser } from "../middleware/user.guard.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.post("/ask-ai",validateWhitelist({body:["message","type"],query:[],params:[]}),verifyUser,checkAiAccess,AskAi);
export default router;