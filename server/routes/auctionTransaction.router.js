import express from "express";
import {
  createAuctionTransaction,
  deleteAuctionTransaction,
  getAuctionTransaction,
  updateAuctionTransaction,
} from "../controllers/auctionTransaction.controller.js";

const auctionTransactionRouter = express.Router();

auctionTransactionRouter
  .get("/", getAuctionTransaction)
  .post("/", createAuctionTransaction)
  .put("/:id", updateAuctionTransaction)
  .delete("/:id", deleteAuctionTransaction);

export default auctionTransactionRouter;
