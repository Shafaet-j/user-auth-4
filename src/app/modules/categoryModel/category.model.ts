import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true, unique: true },
});

// categorySchema.pre("save", async function (next) {
//   const isCourseExist = await Category.findOne({ name: this.name });
//   if (isCourseExist) {
//     throw new Error("This course already exist");
//   }
//   next();
// });

export const Category = model<TCategory>("Category", categorySchema);
