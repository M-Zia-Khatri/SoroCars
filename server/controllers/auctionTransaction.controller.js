// controllers/auctionTransaction.controller.js
import { Op } from "sequelize";
import { AuctionTransaction, CarDetail } from "../models/index.js";

export async function getAuctionTransaction(req, res) {
  try {
    const { Stock_Id } = req.query;

    const where = {};
    if (Stock_Id?.trim()) {
      where.Stock_Id = {
        [Op.like]: `%${Stock_Id.trim()}%`, // partial match
      };
    }

    const transactions = await AuctionTransaction.findAll({
      where,
      include: [
        {
          model: CarDetail,
          as: "Car", // <-- use the exact alias here
          attributes: ["Agency"],
        },
      ],
    });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found" });
    }

    const totalAmount = transactions.reduce(
      (acc, curr) => acc + (Number(curr.Amount) || 0),
      0
    );

    return res.status(200).json({
      total: totalAmount,
      transactions,
    });
  } catch (err) {
    console.error("Error fetching auction transactions:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

//
export async function createAuctionTransaction(req, res) {
  try {
    const {
      Transaction_Id,
      Transaction_Invoice_Id,
      Transaction_Date,
      Stock_Id,
      Amount,
      Credit_Debit,
      User_Id,
    } = req.body;

    if (!Transaction_Id || !Transaction_Invoice_Id || !Transaction_Date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTransaction = await AuctionTransaction.create({
      Transaction_Id,
      Transaction_Invoice_Id,
      Transaction_Date,
      Stock_Id,
      Amount,
      Credit_Debit,
      User_Id,
    });

    return res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Error creating auction transaction:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
