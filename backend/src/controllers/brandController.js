import expressAsyncHandler from "express-async-handler";
import { Brand } from "../models/brandModel.js";

// Create a Brand
export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);

    res.status(201).json({ status: true, data: newBrand });
  } catch (error) {
    console.error("Error creating a brand:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get all Brands
export const getAllBrands = expressAsyncHandler(async (rep, res) => {
  try {
    const brands = await Brand.find({});

    res.status(200).json({ status: true, data: brands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get brand by slug
export const getBrandBySlug = expressAsyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const brand = await Brand.findOne({ slug });

    if (!brand) {
      return res
        .status(404)
        .json({ status: false, message: "Brand not found" });
    }

    res.status(200).json({ status: true, data: brand });
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Update Brand
export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });

    if (!brand) {
      return res
        .status(404)
        .json({ status: false, message: "Brand not found" });
    }

    res.status(200).json({ status: true, data: brand });
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Delete Brand
export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ status: false });
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
