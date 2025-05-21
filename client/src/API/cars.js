// src/api/cars.js
import { APIUrls } from "@/constants/urlConstants";
import axiosInstance from "./axiosInstance";

// Fetch cars with optional filters like sale_type or search term
export const fetchCars = async ({ queryKey }) => {
  const [_key, saleType, search = ""] = queryKey;

  const response = await axiosInstance.get(APIUrls.CARS_DETAILS_URL, {
    params: {
      sale_type: saleType,
      ...(search && { search }),
    },
  });

  return response.data;
};

// Add a new car
export const addCar = async (carData) => {
  const response = await axiosInstance.post(APIUrls.CARS_DETAILS_URL, carData);
  return response.data;
};
