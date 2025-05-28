// src/api/cars.js
import { APIUrls } from "@/constants/urlConstants";
import axiosInstance from "../services/axiosInstance";

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

export const fetchCarsCalculation = async ({ queryKey }) => {
  const [_key, dollar] = queryKey;
  try {
    const response = await axiosInstance.get(APIUrls.CARS_CALCULATION_URL, {
      params: { dollar: parseFloat(dollar) || 0 },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching car calculation:", error);
    throw error; // Let React Query handle the error
  }
};

// Add a new car
export const addCar = async (carData) => {
  const response = await axiosInstance.post(APIUrls.CARS_DETAILS_URL, carData);
  return response.data;
};

export const updateCar = async (id, carData) => {
  const response = await axiosInstance.put(
    `${APIUrls.CARS_DETAILS_URL}${id}`,
    carData
  );
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await axiosInstance.delete(
    `${APIUrls.CARS_DETAILS_URL}${id}`
  );
  return response.data;
};
