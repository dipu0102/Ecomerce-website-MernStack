import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/utils/utils.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import {
  errorHandler,
  notFounderrorHandler,
} from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoutes.js";
//Load Enviroment Variable from .env file
dotenv.config();

//Connection to mongodb
dbConnection();

//Initialize Express
const app = express();

//Middleware SetUp
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Api Routes

app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/product", productRouter);
//error Handler Middleware
app.use(errorHandler);
// app.use(notFounderrorHandler);

//Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
