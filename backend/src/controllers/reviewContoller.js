import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/reviewModel.js";

// Create a review
export const createReview = expressAsyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create(req.body);

    res.status(201).json({ status: true, data: newReview });
  } catch (error) {
    console.error("Error creating a review:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get all reviews
export const getAllReviews = expressAsyncHandler(async (rep, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({ status: true, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get review by id
export const getReviewById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res
        .status(404)
        .json({ status: true, message: "Review not found" });
    }

    res.status(200).json({ status: true, data: review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Update review
export const updateReview = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!review) {
      return res
        .status(404)
        .json({ status: false, message: "Review not found" });
    }

    res.status(200).json({
      status: true,
      data: review,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
});

// Delete review
export const deleteReview = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ status: false });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
