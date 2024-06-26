import mongoose from "mongoose";
import slugify from "slugify";

const branSchema = new mongoose.Schema(
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
    logo: String,
  },
  { timestamps: true }
);

branSchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  console.log(this.slug);
  next();
});
export const Brand = mongoose.model("Brand", branSchema);
