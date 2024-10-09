import { Vendor } from "../models/vendorModel.js";
import expressAsyncHandler from "express-async-handler";

export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({ status: true, data: newVendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
