import axiosInstance from "../services/axiosInstance";
import { APIUrls } from "@/constants/urlConstants";

export const addAuctionTransaction = async (payload) => {
  const res = await axiosInstance.post(
    APIUrls.AUCTION_TRANSACTION_URL,
    payload
  );
  return res.data;
};

export const fetchAuctionTransactions = async (stockId) => {
  const url = stockId
    ? `auction-transaction/?Stock_Id=${stockId}`
    : "auction-transaction";
  const { data } = await axiosInstance.get(url);
  return data;
};

export const deleteAuctionTransaction = async (id) => {
  const { data } = await axiosInstance.delete(`auction-transaction/${id}`);
  return data;
};

export const updateAuctionTransaction = async (id, payload) => {
  const { data } = await axiosInstance.put(
    `auction-transaction/${id}`,
    payload
  );
  return data;
}