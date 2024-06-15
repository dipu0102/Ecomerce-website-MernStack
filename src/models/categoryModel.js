import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: String,
    slug: {
      type: String,
      unique: true,
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
  },
  { timestamps: true }
);

categorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  console.log(this.slug);
  next();
});
export const Category = mongoose.model("Category", categorySchema);
