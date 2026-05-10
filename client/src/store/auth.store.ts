import { create } from "zustand";
const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isCheckingAuth: false,
  checkAuth: async () => {},
  createAccount: async (
    name,
    email,
    username,
    password,
    confirmation_password,
    bio,
  ) => {},
  checkPage: async (verificationToken) => {},
  checkCode: async (verificationToken, code) => {},
  resendCode: async (verificationToken) => {},
  login: async (email, password) => {},
  logout: async () => {},
  updateUser: async (name, username, bio) => {},
  updateProfilePhoto: async (file: File) => {},
  checkResetPasswordPage: async (token) => {},
  resetPassword: async (email) => {},
  resetPasswordConfirm: async (token, password) => {},
}));
export default useUserStore;
