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
      return res.status(404).json({ message: "Not found Car" });

    res.json(cars);
  } catch (error) {
    console.error("Error fetching car details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createCarDetail = async (req, res) => {
  try {
    const {
      Stock_Id,
      UserId,
      Ajency,
      Sale_type,
      AmountSTR,
      Invoice_Id,
      AdjustmentSTR,
      Status,
    } = req.body;

    if (
      !Stock_Id ||
      AmountSTR == null ||
      Sale_type == null ||
      Ajency == null ||
      UserId == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const Amount = Number(AmountSTR);
    const Adjustment = Number(AdjustmentSTR);
    const User_Id = Number(UserId); // Updated
    if (isNaN(User_Id) || isNaN(Adjustment) || isNaN(Amount)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const newCar = await CarDetail.create({
      Stock_Id,
      Invoice_Id,
      Adjustment,
      Amount,
      Status,
      Sale_type,
      Agency: Ajency, // Make sure to use correct spelling from your model
      User_Id, // Correct field name
    });

    res.status(201).json({ message: "Car detail created", data: newCar });
  } catch (err) {
    console.error("Error creating car details:", err);
    res.status(500).json({ error: "Failed to create car details" });
  }
};
