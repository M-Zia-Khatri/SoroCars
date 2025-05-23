// controllers/ajentDetail.controller.js
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

export async function getUsers(req, res) {
  try {
    const ajentDetails = await User.findAll();
    if (ajentDetails.length === 0) {
      return res.status(404).json({ error: "No ajent details found" });
    }

    res.json({ data: ajentDetails });
  } catch (err) {
    console.error("Error fetching ajent details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createUser(req, res) {
  try {
    const { Name, Role, Email, Password } = req.body;
    if (!Name || !Role || !Email || !Password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
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
    });

    res.status(201).json({
      message: "User created successfully",
      data: { Name: newUser.Name, Role: newUser.Role, Email: newUser.Email },
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "Email already exists",
        details: err.errors.map((e) => e.message),
      });
    }
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
