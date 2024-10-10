import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getAllWishlists,
  getWishlistById,
  updateWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/wishlist", createWishlist);
wishlistRouter.get("/", getAllWishlists);
wishlistRouter.get("/wishlist/:id", getWishlistById);
wishlistRouter.put("/wishlist/:id", protect, updateWishlist);
wishlistRouter.delete("/wishlist/:id", protect, deleteWishlist);

export default wishlistRouter;
