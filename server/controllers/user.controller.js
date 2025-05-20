// controllers/ajentDetail.controller.js
import { User } from "../models/index.js";

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
    const { Name, Role } = req.body;
    if (!Name || !Role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = await User.create({
      Name,
      Role,
    });

    res.status(201).json({
      message: "Ajent details created successfully",
      data: newUser,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "Phone or Email already exists",
        details: err.errors.map((e) => e.message),
      });
    }
    console.error("Error creating ajent details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
