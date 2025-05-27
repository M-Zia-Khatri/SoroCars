import { StorageConst } from "@/constants/storageConstants";
import { APIUrls } from "@/constants/urlConstants";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: APIUrls.BASE_URL, // set this as needed
  headers: {
    "Content-Type": "application/json",
    Authorization: Cookies.get(StorageConst.Token),
  },
});

export default axiosInstance;
