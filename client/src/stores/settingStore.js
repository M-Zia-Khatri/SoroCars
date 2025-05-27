import { StorageConst } from "@/constants/storageConstants";
import { getItem } from "@/services/storageService";
import { create } from "zustand";

const useSetting = create((set) => {
  // Get initial dollar value from localStorage
  const initialDollar = parseFloat(getItem(StorageConst.Dollar)) || 0;

  return {
    DollarValue: initialDollar,
    setDollarValue: (value) => set({ DollarValue: parseFloat(value) || 0 }),
  };
});

export default useSetting;
