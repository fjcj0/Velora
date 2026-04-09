import { create } from "zustand";
const getInitialSlideState = (): boolean => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("isSlideOpen");
    return stored !== null ? JSON.parse(stored) : true;
  }
  return true;
};
interface SlideState {
  isSlideOpen: boolean;
  openSlide: () => void;
  closeSlide: () => void;
  toggleSlide: () => void;
}
const useSlideStore = create<SlideState>((set) => ({
  isSlideOpen: getInitialSlideState(),
  openSlide: () =>
    set(() => {
      localStorage.setItem("isSlideOpen", "true");
      return { isSlideOpen: true };
    }),
  closeSlide: () =>
    set(() => {
      localStorage.setItem("isSlideOpen", "false");
      return { isSlideOpen: false };
    }),
  toggleSlide: () =>
    set((state) => {
      const newState = !state.isSlideOpen;
      localStorage.setItem("isSlideOpen", JSON.stringify(newState));
      return { isSlideOpen: newState };
    }),
}));
export default useSlideStore;
