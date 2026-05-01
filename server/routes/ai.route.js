import express from "express";
import { checkAiAccess, checkAiAccessAdmin } from "../middleware/ai.guard.js";
import { AskAi } from "../controllers/ai.controller.js";
import { verifyUser } from "../middleware/user.guard.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.post(
  "/ask-ai",
  validateWhitelist({
    body: {
      message: "string",
      type: "string"
    },
    query: {},
    params: {}
  }),
  verifyUser,
  checkAiAccess,
  AskAi
);
router.post(
  "/ask-ai-admin",
  validateWhitelist({
    body: {
      message: "string",
      type: "string"
    },
    query: {},
    params: {}
  }),
  checkAiAccessAdmin,
  AskAi
);
export default router;