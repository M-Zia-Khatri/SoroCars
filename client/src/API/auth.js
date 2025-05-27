import { APIUrls } from "@/constants/urlConstants";
import axios from "axios";

export async function loginUser({ email, password }) {
  const response = await axios.post(
    `${APIUrls.BASE_URL}${APIUrls.AUTH}${APIUrls.LOGIN_URL}`,
    {
      Email: email,
      Password: password,
    }
  );
  return response.data;
}
