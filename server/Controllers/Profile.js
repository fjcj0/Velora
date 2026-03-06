import bcrypt from "bcryptjs";
import { User, validationUpdate } from "../Models/user";

export const getAllUser = async (req, res) => {
  const user = await User.find().select("-password");

  return res.status(200).json(user);
};

export const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json(user);
};

export const UpdateProfile = async (req, res) => {
  const { error } = validationUpdate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User or passord not found" });
  }
  if (req.body.password) {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
  }
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: hashedpassword,
        bio: req.body.bio,
      },
    },
    { new: true },
  ).select("-password");

  return res.status(200).json(updateUser);
};
