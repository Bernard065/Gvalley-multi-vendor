import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryBySlug,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { deleteCategory } from "../controllers/categoryController.js";
const subCategoryRouter = express.Router();

subCategoryRouter.post("/sub-category", protect, createSubCategory);
subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.get("/sub-category/:slug", getSubCategoryBySlug);
subCategoryRouter.put("/sub-category/:id", protect, updateSubCategory);
subCategoryRouter.delete("/sub-category/:id", protect, deleteSubCategory);

export default subCategoryRouter;
