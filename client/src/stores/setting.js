import { getItem } from "@/services/storageService";
import { create } from "zustand";

const useSetting = create((set) => {
  // Get initial dollar value from localStorage
  const initialDollar = parseFloat(getItem("doller")) || 0;

  return {
    DollerValue: initialDollar,
    setDollerValue: (value) => set({ DollerValue: parseFloat(value) || 0 }),
  };
});

export default useSetting;
