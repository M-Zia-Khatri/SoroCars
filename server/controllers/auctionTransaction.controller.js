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
      return res
        .status(404)
        .json({ success: false, message: "No transactions found" });
    }

    const totalAmount = transactions.reduce((acc, curr) => {
      const amount = Number(curr.Amount) || 0;
      return curr.Credit_Debit === "Credit" ? acc + amount : acc - amount;
    }, 0);

    return res.status(200).json({
      success: true,
      message: "Auction transactions fetched successfully",
      Response: {
        total: totalAmount,
        transactions,
      },
    });
  } catch (err) {
    console.error("Error fetching auction transactions:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

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
      Receiver,
      Sender,
      Partner,
    } = req.body;

    if (!Receiver || !Sender || !Partner) {
      return res.status(400).json({
        success: false,
        message: "Receiver, Sender, and Partner are required",
      });
    }

    if (!Transaction_Id || !Transaction_Invoice_Id || !Transaction_Date) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newTransaction = await AuctionTransaction.create({
      Transaction_Id,
      Transaction_Invoice_Id,
      Transaction_Date,
      Stock_Id,
      Amount,
      Credit_Debit,
      User_Id,
      Sender,
      Receiver,
      Partner,
    });

    return res.status(201).json({
      success: true,
      message: "Auction transaction created successfully",
      newTransaction,
    });
  } catch (err) {
    console.error("Error creating auction transaction:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function updateAuctionTransaction(req, res) {
  try {
    const { id } = req.params;
    const {
      Transaction_Id,
      Transaction_Invoice_Id,
      Transaction_Date,
      Stock_Id,
      Amount,
      Credit_Debit,
      User_Id,
      Receiver,
      Sender,
    } = req.body;

    if (!Receiver || !Sender) {
      return res
        .status(400)
        .json({ success: false, message: "Receiver, and Sender are required" });
    }

    const transaction = await AuctionTransaction.findByPk(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    await transaction.update({
      Transaction_Id,
      Transaction_Invoice_Id,
      Transaction_Date,
      Stock_Id,
      Amount,
      Credit_Debit,
      User_Id,
      Sender,
      Receiver,
    });

    return res.status(200).json({
      success: true,
      message: "Auction transaction updated successfully",
      transaction,
    });
  } catch (err) {
    console.error("Error updating auction transaction:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function deleteAuctionTransaction(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Transaction ID is required" });
    }
    console.log("id", id);
    const transaction = await AuctionTransaction.findOne({
      where: { Transaction_Id: id },
    });
    console.log("transaction", transaction);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    await transaction.destroy();

    return res.status(200).json({
      success: true,
      message: "Auction transaction deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting auction transaction:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
