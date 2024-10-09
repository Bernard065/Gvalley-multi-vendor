import { Product } from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";

// Create product
export const createProduct = expressAsyncHandler(async (res, req) => {
  try {
    const newProduct = await Product(req.body);

    res.status(201).json({ status: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get all products
export const getAllProducts = expressAsyncHandler(async (res, req) => {
  try {
    const products = await Product.find().populate({
      path: "vendor",
      select: "storeName",
    });

    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get product by slug
export const getProductBySlug = expressAsyncHandler(async (res, req) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate({
      path: "vendor",
      select: "storeName",
    });

    // If the product is not found, return a 404 status
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found." });
    }

    // Send the product data as the response
    res.status(200).json({ status: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Update a product
export const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({
      path: "vendor",
      select: "storeName",
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found." });
    }

    res.status(200).json({ status: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Delete a product
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting a product:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
