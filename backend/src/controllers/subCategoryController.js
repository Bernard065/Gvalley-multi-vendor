import expressAsyncHandler from "express-async-handler";
import { SubCategory } from "../models/subCategoryModel.js";

// Create subcategory
export const createSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);

    res.status(201).json({ status: true, data: newSubCategory });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get all subCategories
export const getAllSubCategories = expressAsyncHandler(async (req, res) => {
  try {
    const subCategories = await SubCategory.find({});

    res.status(200).json({ status: true, data: subCategories });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get SubCategory by slug
export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const subCategory = await SubCategory.findOne({ slug });

    if (!subCategory) {
      return res
        .status(404)
        .json({ status: true, message: "SubCategory not found" });
    }

    res.status(200).json({ status: true, data: subCategory });
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Update Category
export const updateSubCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const subCategory = await SubCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!subCategory) {
      return res
        .status(404)
        .json({ status: false, message: "SubCategory not found" });
    }

    res.status(200).json({
      status: true,
      data: subCategory,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
});

// Delete SubCategory
export const deleteSubCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ status: false });
    }

    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting Subcategory:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
