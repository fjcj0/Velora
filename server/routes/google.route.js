import express from "express";
import passport from "../config/passport.config.js";
import { googleCallback } from "../controllers/google.controller.js";
import { blockUser } from "../middleware/user.guard.js";
import { validateWhitelist } from "../middleware/server.guard.js";
const router = express.Router();
router.get(
  "/google",
  validateWhitelist({
    body: {},
    query: {},
    params: {}
  }),
  blockUser,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  validateWhitelist({
    body: {},
    query: {},
    params: {}
  }),
  blockUser,
  passport.authenticate("google", { session: false }),
  googleCallback
);
export default router;