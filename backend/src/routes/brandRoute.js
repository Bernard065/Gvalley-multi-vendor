import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandBySlug,
  updateBrand,
} from "../controllers/brandController.js";

const brandRouter = express.Router();

brandRouter.post("/brand", protect, createBrand);
brandRouter.get("/brands", getAllBrands);
brandRouter.get("/brand/:slug", getBrandBySlug);
brandRouter.put("/brand/:id", protect, updateBrand);
brandRouter.delete("/brand/:id", protect, deleteBrand);

export default brandRouter;
