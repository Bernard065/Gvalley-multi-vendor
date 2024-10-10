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

productRouter.post("/product", protect, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/product/:slug", getProductBySlug);
productRouter.put("/product/:id", protect, updateProduct);
productRouter.delete("/product/:id", protect, deleteProduct);

export default productRouter;
