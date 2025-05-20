// routes/ajentDetail.route.js
import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter
    .get("/", getUsers)
    .post("/", createUser);

export default userRouter;