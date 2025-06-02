import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initDB from "./initDB.js"; // 👈 import this
import carDetailRouter from "./routes/carsDetail.router.js";
import userRouter from "./routes/user.router.js";
import auctionTransactionRouter from "./routes/auctionTransaction.router.js";
import carCalculationRouter from "./routes/carCalculation.router.js";
import auth from "./middleware/auth.middleware.js";
import AuthRouter from "./routes/auth.router.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", AuthRouter)
  .use("/api/users", userRouter)
  .use(auth)
  .use("/api/cars-details", carDetailRouter)
  .use("/api/auction-transaction", auctionTransactionRouter)
  .use("/api/car-calculation", carCalculationRouter);

// ✅ Call initDB before starting server
initDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}/api`);
  });
}).catch((err) => {
  console.error("❌ Failed to initialize DB:", err);
});
