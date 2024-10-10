import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
  },
  { timestamps: true }
);

// Pre-save hook to generate slug for SubCategory
subCategorySchema.pre("save", function (next) {
  // Generate slug only if the name has changed or if slug is not set
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
