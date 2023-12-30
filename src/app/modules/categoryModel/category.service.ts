import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDb = async (categoryData: TCategory) => {
  const category = new Category(categoryData);

  const result = await category.save();
  return result;
};

const getAllCategoryFromDb = async () => {
  const result = await Category.find().populate({
    path: "createdBy",
    select: "_id email role username",
  });
  return { categories: result };
};

export const categoryService = {
  createCategoryIntoDb,
  getAllCategoryFromDb,
};
