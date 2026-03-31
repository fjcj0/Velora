import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.utils.js";
export const googleCallback = async (request, response) => {
  const user = request.user;
  await generateTokenAndSetCookie(response, user);
  return response.redirect("http://localhost:5173/auth/login");
};