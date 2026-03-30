import express from "express";
import { googleAuth } from "../controllers/google.controller";

const router = express.Router();

router.post("/google-login", googleAuth);
