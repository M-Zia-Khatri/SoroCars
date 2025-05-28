// routes/carDetail.route.js
import express from "express";
import {
  createCarDetail,
  getCarDetail,
  updateCarDetail,
  deleteCarDetail,
} from "../controllers/carDetail.controller.js";

const carDetailRouter = express.Router();

carDetailRouter
  .get("/", getCarDetail)
  .post("/", createCarDetail)
  .put("/:id", updateCarDetail)
  .delete("/:id", deleteCarDetail);

export default carDetailRouter;
