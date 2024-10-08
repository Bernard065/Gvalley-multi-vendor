import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, getUserById);
userRouter.put("/profile", protect, updateUser);
userRouter.get("/profiles", protect, authorize("admin"), getAllUsers);
userRouter.delete("/:id", protect, deleteUser);

export default userRouter;
