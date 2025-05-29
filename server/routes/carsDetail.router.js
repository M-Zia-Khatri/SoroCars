// routes/carDetail.route.js
import express from "express";
import {
  createCarDetail,
  getCarDetail,
} from "../controllers/carDetail.controller.js";

const carDetailRouter = express.Router();

carDetailRouter
  .get("/", getCarDetail)
  .post("/", createCarDetail);

export default carDetailRouter;
