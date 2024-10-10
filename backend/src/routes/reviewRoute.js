import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controllers/reviewContoller.js";

const reviewRouter = express.Router();

reviewRouter.post("/review", protect, createReview);
reviewRouter.get("/", getAllReviews);
reviewRouter.get("/review/:id", getReviewById);
reviewRouter.put("/review/:id", protect, updateReview);
reviewRouter.delete("/review/:id", protect, deleteReview);

export default reviewRouter;
