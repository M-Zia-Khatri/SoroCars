import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import carDetailRouter from "./routes/carsDetail.router.js";
import sequelize from "./config/db.connection.js";
import userRouter from "./routes/user.router.js";
import auctionTransactionRouter from "./routes/auctionTransaction.router.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/cars-details", carDetailRouter);
app.use("/api/auction-transaction", auctionTransactionRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server running on port", process.env.PORT || 3000)
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
