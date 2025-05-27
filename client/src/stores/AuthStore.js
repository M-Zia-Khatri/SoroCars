import { create } from "zustand";
import Cookies from "js-cookie";
import { StorageConst } from "@/constants/storageConstants";
import { getItem, setItem } from "@/services/storageService";

const useAuth = create((set) => {
  const cookieValue = Cookies.get(StorageConst.Token);
  cookieValue
    ? cookieValue === "undefined" || cookieValue === "null"
      ? false
      : setItem(StorageConst.Token, cookieValue, sessionStorage)
    : false;
  return {
    isLoggedIn: getItem(StorageConst.Token, sessionStorage),
    userData: getItem(StorageConst.User),
    setIsLoggedIn: (value = false, data) => {
      set({
        isLoggedIn: value,
        ...(data && { data }),
      });
    },
  };
});

export default useAuth;
