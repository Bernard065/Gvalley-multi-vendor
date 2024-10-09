import mongoose from "mongoose";
import slugify from "slugify";

const subscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: ["basic", "premium"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    iActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false } // Disables auto-generated _id for this schema
);

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    storeDescription: {
      type: String,
      required: true,
    },
    storeImage: {
      type: String,
      required: true,
    },
    storeBanner: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    subscription: subscriptionSchema,
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from storeName
vendorSchema.pre("save", function (next) {
  // Check if storeName is defined
  if (this.storeName) {
    this.slug = slugify(this.storeName, { lower: true }); // Generate slug
  }
  next();
});

export const Vendor = mongoose.model("Vendor", vendorSchema);
