import { Vendor } from "../models/vendorModel.js";
import expressAsyncHandler from "express-async-handler";

// Create a new vendor
export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    const { user, storeName, storeDescription, storeImage, storeBanner } =
      req.body;

    // Validate the request body
    if (
      !user ||
      !storeName ||
      !storeDescription ||
      !storeImage ||
      !storeBanner
    ) {
      return res.status(400).json({
        status: false,
        message:
          "All fields are required: user, storeName, storeDescription, storeImage, storeBanner.",
      });
    }

    //  Create a new vendor with the data from the request body
    const newVendor = await Vendor.create({
      user,
      storeName,
      storeDescription,
      storeImage,
      storeBanner,
      // The slug will be generated automatically by the pre-save hook
    });

    // Send a success response with the created vendor data and a 201 status code
    res.status(201).json({ status: true, data: newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all vendors

export const getAllVendors = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find().populate({
      path: "user",
      select: "-password",
    });

    res.status(201).json({ status: true, data: vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get vendor by slug
export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;

    // Validate the slug parameter
    if (!slug) {
      return res
        .status(400)
        .json({ status: false, message: "Slug is required." });
    }

    // Find the vendor by slug
    const vendor = await Vendor.findOne({ slug }).populate({
      path: "user",
      select: "-password",
    });

    // If vendor not found, return a 404 response
    if (!vendor) {
      return res
        .status(404)
        .json({ status: false, message: "Vendor not found." });
    }

    // Send a success response with the vendor data
    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    console.error("Error retrieving vendor by slug:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

/// Update Vendor
export const updateVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!vendor) {
      return res
        .status(404)
        .json({ status: false, message: "Vendor not found." });
    }

    // Send a success response with the updated vendor data
    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Delete Vendor
export const deleteVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res
        .status(404)
        .json({ status: false, message: "Vendor not found." });
    }

    // Send a success response
    res.status(200).json({ message: "Vendor deleted successfully." });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
