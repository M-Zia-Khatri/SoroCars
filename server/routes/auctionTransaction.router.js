import express from "express";
import { createAuctionTransaction, getAuctionTransaction } from "../controllers/auctionTransaction.controller.js";

const auctionTransactionRouter = express.Router();

auctionTransactionRouter
  .get("/", getAuctionTransaction)
  .post("/", createAuctionTransaction);

export default auctionTransactionRouter;
