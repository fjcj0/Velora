import api from "./api.utils";
export const protectServer = async () => {
  try {
    await api.get("/protect-server");
  } catch (error) {
    console.log("Fetch test error:", error);
  }
};
