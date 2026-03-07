import { validateLoginUser, User, validationRegister } from "../Models/user.js";
import bcrypt from "bcryptjs";
export const login = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "user or password vailed" });
  }
  const isPassWordMatched = await bcrypt.compare(req.password, user.password);
  if (!isPassWordMatched) {
    return res.status(200).json({ message: "user or password not vailed" });
  }
  const token = user.generateToken();
  res.status(200).json(token);
};
export const register = async (req, res) => {
  const { error } = validationRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password, username } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already used" });
  }
  const Hashedpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: Hashedpassword,
    username,
  });
  const { password: removedPassword, ...userWithoutPassword } = newUser._doc;
  newUser.save();
  const token = user.generateToken();
  return res.status(201).json({
    user: userWithoutPassword,
    token: token,
  });
};