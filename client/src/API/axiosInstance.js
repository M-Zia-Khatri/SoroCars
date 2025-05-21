import { APIUrls } from "@/constants/urlConstants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: APIUrls.BASE_URL, // set this as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
