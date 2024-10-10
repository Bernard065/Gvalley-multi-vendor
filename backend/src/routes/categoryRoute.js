import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/category", protect, createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/category/:slug", getCategoryBySlug);
categoryRouter.put("/category/:id", protect, updateCategory);
categoryRouter.delete("/category/:id", protect, deleteCategory);

export default categoryRouter;
