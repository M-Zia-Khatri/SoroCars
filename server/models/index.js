// server/models/index.js
import CarDetail from "./CarDetail.model.js";
import User from "./User.model.js";
import AuctionTransaction from "./AuctionTransaction.model.js";

// --- Associations ---

// User ↔ CarDetail (1:M)
CarDetail.belongsTo(User, { foreignKey: "User_Id", as: "User" });
User.hasMany(CarDetail, { foreignKey: "User_Id", as: "Cars" });

// CarDetail ↔ AuctionTransaction (1:M)
AuctionTransaction.belongsTo(CarDetail, { foreignKey: "Stock_Id", as: "Car" });
CarDetail.hasMany(AuctionTransaction, { foreignKey: "Stock_Id", as: "Transactions" });

// User ↔ AuctionTransaction (1:M)
AuctionTransaction.belongsTo(User, { foreignKey: "User_Id", as: "User" });
User.hasMany(AuctionTransaction, { foreignKey: "User_Id", as: "Transactions" });

export { User, CarDetail, AuctionTransaction };
