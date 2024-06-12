import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const dbConnection = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.error("MOngoDb Connection Error", error);
    });
