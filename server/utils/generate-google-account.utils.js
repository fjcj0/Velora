import { passwordRegex, usernameRegex } from "../auth.regax.js";
export const generateUsername = (name = "user") => {
  let username;
  do {
    username =
      name
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9_.]/g, "")
        .slice(0, 10) +
      Math.floor(Math.random() * 1000);
  } while (!usernameRegex.test(username));
  return username;
};
export const generatePassword = () => {
  const chars = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    special: "!@#$%^&*()_+[]{}",
  };
  let password;
  do {
    password =
      chars.lower[Math.floor(Math.random() * chars.lower.length)] +
      chars.upper[Math.floor(Math.random() * chars.upper.length)] +
      chars.number[Math.floor(Math.random() * chars.number.length)] +
      chars.special[Math.floor(Math.random() * chars.special.length)];
    const all = chars.lower + chars.upper + chars.number + chars.special;
    for (let i = 0; i < 6; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }
  } while (!passwordRegex.test(password));
  return password;
};