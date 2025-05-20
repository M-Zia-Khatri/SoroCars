// controllers/auctionTransaction.controller.js
import { Op } from "sequelize";
import { AuctionTransaction } from "../models/index.js";

export async function getAuctionTransaction(req, res) {
  try {
    const { Stock_Id } = req.query;

    const where = {};
    if (Stock_Id?.trim()) {
      where.Stock_Id = {
        [Op.like]: `%${Stock_Id.trim()}%`, // partial match
      };
    }

    const transactions = await AuctionTransaction.findAll({ where });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found" });
    }

    return res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching auction transactions:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// 
export async function createAuctionTransaction(req, res) {
  try {
    const { Stock_Id, Amount, User_Id, Credit_Debit } = req.body;
    if (!Stock_Id || Amount == null || !Credit_Debit) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Optional: you could validate that User_Id exists or default to null
    const newTransaction = await AuctionTransaction.create({
      Stock_Id,
      Amount,
      Credit_Debit,
      User_Id: User_Id || null,
    });

    res.status(201).json({
      message: "Auction transaction created successfully",
      data: newTransaction,
    });
  } catch (err) {
    console.error("Error creating auction transaction:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
