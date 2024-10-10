import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/utilis/utils.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import {
  errorHandler,
  notFoundErrorHandler,
} from "./src/middlewares/errorHandler.js";
import userRouter from "./src/routes/userRoutes.js";
import vendorRouter from "./src/routes/vendorRoutes.js";
import productRouter from "./src/routes/productRoute.js";
import brandRouter from "./src/routes/brandRoute.js";
import categoryRouter from "./src/routes/categoryRoute.js";
import subCategoryRouter from "./src/routes/subCategoryRoute.js";

// Load environment Variables from .env file
dotenv.config();

// Connection to mongodb
dbConnect();

// Intialize express app
const app = express();

//Middleware setup
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Api Routes
app.use("/api/user", userRouter);
app.use("/api", vendorRouter);
app.use("/api", productRouter);
app.use("/api", brandRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sub-categories", subCategoryRouter);

// Error Handler Middlewares
app.use(errorHandler);
app.use(notFoundErrorHandler);

// Starting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
