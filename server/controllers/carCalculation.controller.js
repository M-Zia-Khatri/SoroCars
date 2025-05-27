import { CarDetail, User } from "../models/index.js";

export const calculateStock = async (req, res) => {
  const dollar = parseFloat(req.query.dollar);

  if (isNaN(dollar)) {
    return res.status(400).json({ success: false, message: "Invalid dollar value" });
  }

  try {
    const cars = await CarDetail.findAll({
      where: { Sale_type: "Stock" },
      include: [
        {
          model: User,
          as: "User",
          attributes: ["User_Id", "Name", "Role"],
        },
      ],
    });

    const totalAdjustmentUsd = cars.reduce(
      (acc, curr) => acc + (Number(curr.Adjustment) || 0),
      0
    );

    const totalAmount = cars.reduce(
      (acc, curr) => acc + (Number(curr.Amount) || 0),
      0
    );

    const totalAdjustmentInPKR = totalAdjustmentUsd * dollar;

    const result = cars.map((car) => {
      const plainCar = car.get({ plain: true });
      const adjustment = Number(plainCar.Adjustment) || 0;
      const amount = Number(plainCar.Amount) || 0;
      return {
        ...plainCar,
        Total: amount + adjustment * dollar,
      };
    });

    return res.json({
      totalCars: result.length,
      totalAdjustmentUsd,
      totalAdjustmentInPKR,
      totalAmount,
      grandTotal: totalAdjustmentInPKR + totalAmount,
      cars: result,
    });
  } catch (error) {
    console.error("Error calculating car stock:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

