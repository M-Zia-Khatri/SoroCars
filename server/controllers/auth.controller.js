import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export async function login(req, res) {
  try {
    const { Email, Password } = req.body ?? {};

    if (!Email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is Required" });
    }
    if (!Password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is Required" });
    }
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const isPasswordSame = await bcrypt.compare(Password, user.Password);
    if (!isPasswordSame) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const jwtToken = jwt.sign(
      { email: user.Email, id: user.User_Id },
      process.env.JWT_SECRET,
      { expiresIn: "3h" } // Token expires in 2 hour if user closes the website
    );

    res.json({
      success: true,
      message: "Login Successful",
      data: {
        email: user.Email,
        name: user.Name,
        role: user.Role,
        userId: user.User_Id,
        token: jwtToken,
      },
    });
  } catch (err) {
    console.error("Error in login", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
