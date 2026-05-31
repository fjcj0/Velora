import { create } from "zustand";
import api from "../utils/api.utils";
import axios from "axios";
import { toast } from "sonner";
const endpoint = "/auth";
const useUserStore = create<UserStore>((set) => ({
  user: null,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await api.get(`${endpoint}/check`);
      set({
        user: response.data.user,
      });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  createAccount: async (
    name,
    email,
    username,
    password,
    confirmation_password,
  ) => {
    try {
      const response = await api.post(`${endpoint}/register`, {
        name,
        email,
        username,
        password,
        confirm_password: confirmation_password,
      });
      if (response.status === 200 || response.status === 201) {
        return response.data.verificationToken;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
      return false;
    }
  },
  checkPage: async (verificationToken) => {
    try {
      const response = await api.get(
        `${endpoint}/check-page/${verificationToken}`,
      );
      return response.data;
    } catch (error) {
      return false;
    }
  },
  checkCode: async (verificationToken, code) => {
    try {
      const response = await api.post(`${endpoint}/check-code`, {
        verificationToken,
        verificationCode: code,
      });
      if (response.status === 200) {
        set({
          user: response.data.user,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    }
  },
  resendCode: async (verificationToken) => {
    try {
      const response = await api.post(`${endpoint}/resend-code`, {
        verificationToken,
      });
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    }
  },
  login: async (email, password) => {
    try {
      const response = await api.post(`${endpoint}/login`, {
        email,
        password,
      });
      if (response.data?.verificationToken) {
        return response.data.verificationToken;
      }
      set({
        user: response.data.user,
      });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
      return false;
    }
  },
  logout: async () => {
    try {
      const response = await api.post(`${endpoint}/logout`);
      if (response.status === 200) {
        set({ user: null });
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    }
  },
  updateUser: async (name, username, bio) => {
    try {
      const response = await api.post(`${endpoint}/update-user`, {
        name,
        username,
        bio,
      });
      if (response.status === 200) {
        set({
          user: response.data.user,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    }
  },
  updateProfilePhoto: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("profilePhoto", file);
      const response = await api.post(
        `${endpoint}/update-profile-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        set({
          user: response.data.user,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
    }
  },
  checkResetPasswordPage: async (token) => {
    try {
      const response = await api.get(
        `${endpoint}/check-reset-password-page/${token}`,
      );
      return response.status === 200;
    } catch {
      return false;
    }
  },
  resetPassword: async (email) => {
    try {
      const response = await api.post(`${endpoint}/reset-password`, {
        email,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
        return false;
      }
    }
  },
  resetPasswordConfirm: async (token, password) => {
    try {
      const response = await api.post(`${endpoint}/confirm-password/${token}`, {
        password,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error(error instanceof Error ? error.message : String(error));
      }
      return false;
    }
  },
}));
export default useUserStore;
