import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generatePassword, generateUsername } from "../utils/generate-google-account.utils.js";
export const findOrCreateUser = async (profile) => {
  const email = profile.emails[0].value;
  const name = profile.displayName || `${profile.name?.givenName || ""} ${profile.name?.familyName || ""}`.trim();
  let user = await User.findOne({ email });
  if (!user) {
    let username;
    let exists;
    do {
      username = generateUsername(profile.displayName);
      exists = await User.findOne({ username });
    } while (exists);
    const rawPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    user = await User.create({
      email,
      username,
      password: hashedPassword,
      name,
    });
  }
  return user;
};