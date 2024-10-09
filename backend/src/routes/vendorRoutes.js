import express from "express";
import {
  createVendor,
  deleteVendor,
  getAllVendors,
  getVendorBySlug,
  updateVendor,
} from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";

const vendorRouter = express.Router();

vendorRouter.post("/vendor", protect, createVendor);
vendorRouter.get("/vendors", protect, getAllVendors);
vendorRouter.get("/vendor/:slug", protect, getVendorBySlug);
vendorRouter.put("/vendor/:id", protect, updateVendor);
vendorRouter.delete("/vendor/:id", protect, deleteVendor);

export default vendorRouter;
