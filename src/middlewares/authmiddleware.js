import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodeed = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodeed.id).select("-password");
      console.log("inside token", req.user);
      next();
    } catch (error) {
      next("Not Authorized");
    }
  }
  if (!token) {
    next("No Token attached to header");
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next("You don't have Permission");
    }
    next();
  };
};
