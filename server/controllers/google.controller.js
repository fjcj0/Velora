import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.utils.js";
export const googleCallback = async (req, res) => {
  const user = req.user;
  await generateTokenAndSetCookie(res, user);
  return res.redirect("http://localhost:5713");
};
