import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
} from "../controllers/productControlller.js";
import vendorRouter from "./vendorRoutes.js";

const productRouter = express.Router();

vendorRouter.post("/product", protect, createProduct);
vendorRouter.get("/products", getAllProducts);
vendorRouter.get("/product/:slug", getProductBySlug);
vendorRouter.put("/product/:id", protect, updateProduct);
vendorRouter.delete("/product/:id", protect, deleteProduct);

export default productRouter;
