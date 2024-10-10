import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/categoryModel.js";

// Create Category
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json({ status: true, data: newCategory });
  } catch (error) {
    console.error("Error creating a category:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get all Categories
export const getAllCategories = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({ status: true, data: categories });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get Category by slug
export const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.findOne({ slug });

    if (!category) {
      return res
        .status(404)
        .json({ status: true, message: "Category not found" });
    }

    res.status(200).json({ status: true, data: category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Update Category
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!category) {
      return res
        .status(404)
        .json({ status: false, message: "Category not found" });
    }

    res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
});

// Delete Category
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ status: false });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
