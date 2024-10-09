import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utilis/utils.js";

// Register a new user
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // Send a proper response status and message
      res.status(400).json({ message: "User Already Exists!" });
      return; // Stop further execution
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Optionally, include a JWT token
        token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        }),
      });
    } else {
      res.status(400).json({ message: "Invalid User Data!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
});

// Login user
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password, user.password))) {
      // Respond with user data and token if authentication is successful
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // Respond with a 401 status if credentials are invalid
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    // Log the error and send a server error response
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get a user
export const getUserById = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update user
export const updateUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log("User:", req.user); // Log the user object in the protect middleware
  console.log("Updating user:", req.user._id); // Log the user ID in the updateUser function

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields conditionally
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Update password only if provided and hash it
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10); // Hash the new password
    }

    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;

    // Save the updated user
    const updatedUser = await user.save();

    // Respond with the updated user information
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      isActive: updatedUser.isActive,
      address: updatedUser.address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get all users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    // Fetch all users and exclude password field
    const users = await User.find({}).select("-password");

    if (users && users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a user
export const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
