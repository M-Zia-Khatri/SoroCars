import sequelize from "./config/db.connection.js";
import { User, CarDetail, AuctionTransaction } from "./models/index.js";
import initDB from "./initDB.js";

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected.");

    // Sync models in dependency order
    await User.sync({ alter: true });
    await CarDetail.sync({ alter: true });
    await AuctionTransaction.sync({ alter: true });

    console.log("✅ All models synced successfully.");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
};

initDB();
