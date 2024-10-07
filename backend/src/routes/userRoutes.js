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
userRouter.get("/user/:id", protect, getUserById);
userRouter.put("/user/:id", protect, updateUser);
userRouter.get("/users", protect, authorize("admin"), getAllUsers);
userRouter.delete("/user/:id", protect, deleteUser);

export default userRouter;
