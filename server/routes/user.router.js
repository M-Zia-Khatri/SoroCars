// routes/ajentDetail.route.js
import express from "express";
import { getUsers, createUser } from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter
    .get("/",auth, getUsers)
    .post("/", createUser);

export default userRouter;