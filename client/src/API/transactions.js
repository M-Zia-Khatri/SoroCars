import axiosInstance from "./axiosInstance";
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
