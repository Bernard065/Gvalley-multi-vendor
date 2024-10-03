import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  // Check if the password field has been modified - If not modified, proceed to the next middleware
  if (!this.isModified("password")) return next();

  // Hash the password with a salt round of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare a candidate password with the stored password
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  // Compare the provided candidate password with the stored password
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model("User", userSchema);
