import expressAsyncHandler from "express-async-handler";
import { Wishlist } from "../models/wishlistModel.js";

// Create Category
export const createWishlist = expressAsyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if the wishlist already exist for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    if (wishlist) {
      // If wishlist exists, update it by adding the product if it's not already present
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Product already in wishlist" });
      }
    } else {
      // If wishlist doesn't exist, create a new one
      wishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
    }

    res.status(201).json({ status: true, data: wishlist });
  } catch (error) {
    console.error("Error creating a wishlist:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get all wishlist
export const getAllWishlists = expressAsyncHandler(async (req, res) => {
  try {
    const wishlists = await Wishlist.find({})
      .populate({ path: "user", select: "-password" })
      .populate("products");

    res.status(200).json({ status: true, data: wishlists });
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Get Wishlist by Id
export const getWishlistById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const wishlist = await Wishlist.findById(id);

    if (!wishlist) {
      return res
        .status(404)
        .json({ status: true, message: "Wishlist not found" });
    }

    res.status(200).json({ status: true, data: wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});

// Update Wishlist
export const updateWishlist = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const wishlist = await Wishlist.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!wishlist) {
      return res
        .status(404)
        .json({ status: false, message: "Wishlist not found" });
    }

    res.status(200).json({
      status: true,
      data: wishlist,
    });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
});

// Delete Wishlist
export const deleteWishlist = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWishlist = await Wishlist.findByIdAndDelete(id);

    if (!deletedWishlist) {
      return res.status(404).json({ status: false });
    }

    res.status(200).json({ message: "Wishlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting wishlist:", error);
    res.status(500).json({ status: false, message: "Server Error" });
  }
});
