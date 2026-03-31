const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

export const googleAuth = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: "YOUR_GOOGLE_CLIENT_ID",
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      const username = `user${Date.now()}`;
      const password = Math.random().toString(36).slice(-8);
      user = new User({
        name,
        email,
        picture,
        username,
        password,
      });
      await user.save();
    }
    await generateAndSetCookie(res, user);
    res.json({ message: "Login success", user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Google login failed" });
  }
};
