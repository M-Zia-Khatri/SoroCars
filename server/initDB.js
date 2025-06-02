// server/initDB.js
import sequelize from "./config/db.connection.js";
import { User, CarDetail, AuctionTransaction } from "./models/index.js";

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    // Sync all models (you can also use sequelize.sync() here)
    // await sequelize.sync({ alter: true });

    console.log("✅ All models synced successfully.");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    throw error;
  }
};

export default initDB;
