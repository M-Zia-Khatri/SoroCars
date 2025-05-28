import { Op } from "sequelize";
import { User, CarDetail } from "../models/index.js";

export const getCarDetail = async (req, res) => {
  try {
    const { sale_type, search } = req.query;

    const where = {};
    if (sale_type) {
      where.Sale_type = sale_type;
    }
    if (search) {
      where[Op.or] = [
        { Stock_Id: { [Op.like]: `%${search}%` } },
        { Invoice_Id: { [Op.like]: `%${search}%` } },
      ];
    }
    let cars;
    if (sale_type || search) {
      cars = await CarDetail.findAll({
        where,
        include: [
          {
            model: User,
            as: "User", // <-- use the exact alias here
            attributes: ["User_Id", "Name", "Role"],
          },
        ],
      });
    } else {
      cars = await CarDetail.findAll({
        include: [
          {
            model: User,
            as: "User", // <-- use the exact alias here
            attributes: ["User_Id", "Name", "Role"],
          },
        ],
      });
    }
    if (cars.length === 0)
      return res.status(404).json({ success: false, message: "Not found Car" });

    res.json({ success: true, cars });
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createCarDetail = async (req, res) => {
  try {
    const {
      Stock_Id,
      UserId,
      Agency,
      Sale_type,
      AmountSTR,
      Invoice_Id,
      AdjustmentSTR,
      Status,
      AgentName,
    } = req.body;

    if (
      !Stock_Id ||
      AmountSTR == null ||
      Sale_type == null ||
      Agency == null ||
      UserId == null ||
      AgentName == null
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const Amount = Number(AmountSTR);
    const Adjustment = Number(AdjustmentSTR);
    const User_Id = Number(UserId); // Updated
    if (isNaN(User_Id) || isNaN(Adjustment) || isNaN(Amount)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const isCarExistsOnStockId = await CarDetail.findOne({
      where: { Stock_Id },
    });
    if (isCarExistsOnStockId) {
      return res.status(400).json({
        success: false,
        message: "Car already exists in the database with the same Stock id ",
      });
    }

    const isCarExistsOnInvoiceId = await CarDetail.findOne({
      where: { Invoice_Id },
    });
    if (isCarExistsOnInvoiceId) {
      return res.status(400).json({
        success: false,
        message: "Car already exists in the database with the same Invoice id ",
      });
    }

    const newCar = await CarDetail.create({
      Stock_Id,
      Invoice_Id,
      Adjustment,
      Amount,
      Status,
      Sale_type,
      Agency, // Make sure to use correct spelling from your model
      User_Id, // Correct field name
      AgentName,
    });

    res
      .status(201)
      .json({ success: true, message: "Car detail created", data: newCar });
  } catch (err) {
    console.error("Error creating car details:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create car details" });
  }
};

export const updateCarDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Stock_Id,
      Invoice_Id,
      Adjustment,
      Amount,
      Status,
      Sale_type,
      Agency,
      User_Id,
      AgentName,
    } = req.body;

    if (!id || !Stock_Id || !Invoice_Id || !Adjustment || !Amount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    console.log("test here", req.body);
    if (isNaN(User_Id) || isNaN(Adjustment) || isNaN(Amount)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const carDetail = await CarDetail.findByPk(id);
    if (!carDetail) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const updateFields = {
      Stock_Id,
      Invoice_Id,
      Adjustment,
      Amount,
      Status,
      Sale_type,
      Agency,
      User_Id,
      AgentName,
    };
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    await carDetail.update(updateFields);

    res.json({
      success: true,
      message: "Car detail updated successfully",
      data: carDetail,
    });
  } catch (err) {
    console.error("Error updating car details:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update car details" });
  }
};

export const deleteCarDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const carDetail = await CarDetail.findByPk(id);
    if (!carDetail) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    await carDetail.destroy();

    res.json({ success: true, message: "Car detail deleted successfully" });
  } catch (err) {
    console.error("Error deleting car details:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete car details" });
  }
};
