import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default async function auth(req, res, next) {
  const token = (req.headers?.authorization ?? "").trim();
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { Email: data.email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    switch (err.name) {
      case "JsonWebTokenError":
        res.status(401).json({
          success: false,
          message: "Invalid token provided",
        });
        break;
      default:
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
    }
  }
}
