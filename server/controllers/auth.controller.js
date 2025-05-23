import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body ?? {};

    if (!email) {
      return res.status(400).json({ error: "Email is Required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is Required" });
    }
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const isPasswordSame = await bcrypt.compare(password, user.Password);
    if (!isPasswordSame) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const jwtToken = jwt.sign(
      { email: user.Email, id: user.User_Id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour if user closes the website
    );

    res.json({
      email: user.Email,
      name: user.Name,
      role: user.Role,
      token: jwtToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
