// controllers/agentDetail.controller.js
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

export async function getUsers(req, res) {
  try {
    const [agentDetails] = await User.findAll();
    if (agentDetails.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No agent details found" });
    }

    res.json({
      success: true,
      message: "User details fetched successfully",
      data: {
        User_Id: agentDetails.User_Id,
        Name: agentDetails.Name,
        Role: agentDetails.Role,
        Email: agentDetails.Email,
      },
    });
  } catch (err) {
    console.error("Error fetching agent details:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function createUser(req, res) {
  try {
    const { Name, Role, Email, Password } = req.body;
    if (!Name || !Role || !Email || !Password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(Password, 11);

    const newUser = await User.create({
      Name,
      Role,
      Email,
      Password: hashedPassword,
    });

    console.log("run here zia", {
      Name: newUser.Name,
      Role: newUser.Role,
      Email: newUser.Email,
      UserId: newUser.User_Id,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { Name: newUser.Name, Role: newUser.Role, Email: newUser.Email },
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
        details: err.errors.map((e) => e.message),
      });
    }
    console.error("Error creating user:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
