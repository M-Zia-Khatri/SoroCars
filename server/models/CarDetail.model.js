// models/CarDetail.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.connection.js";

const CarDetail = sequelize.define("car_details", {
  Stock_Id: { type: DataTypes.STRING, primaryKey: true },
  Invoice_Id: { type: DataTypes.STRING, unique: true },
  Adjustment: { type: DataTypes.INTEGER, defaultValue: 0 },
  Amount: { type: DataTypes.INTEGER, allowNull: false },
  Status: { type: DataTypes.TEXT, allowNull: false },
  Sale_type: { type: DataTypes.ENUM("Stock", "Auction") },
  Agency: { type: DataTypes.ENUM("Durrani", "AA-Japan") },
  User_Id: { type: DataTypes.INTEGER, allowNull: false },
  AgentName: { type: DataTypes.STRING, allowNull: false },
});

export default CarDetail;
