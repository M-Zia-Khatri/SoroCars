import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import carDetailRouter from "./routes/carsDetail.router.js";
import sequelize from "./config/db.connection.js";
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

app.use("/api/auth",AuthRouter)
.use("/api/users", userRouter)
.use(auth)
.use("/api/cars-details", carDetailRouter)
.use("/api/auction-transaction", auctionTransactionRouter)
.use("/api/car-calculation", carCalculationRouter)

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(process.env.PORT || 3000, () =>
      console.log("Server running on port",`http://localhost:${port}/api`,)
    );
  })
  
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
