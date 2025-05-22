import  { Router } from "express";
import { calculateStock } from "../controllers/carCalculation.controller.js";

const carCalculationRouter = Router();

carCalculationRouter.get("/", calculateStock);

export default carCalculationRouter;
