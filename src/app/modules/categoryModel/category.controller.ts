import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

import { CatchAsyncError } from "../../utils/CatchAsyncError";
import sendResponse from "../../utils/sendResponds";

const createCategory = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = req.body;
    const result = await categoryService.createCategoryIntoDb(category);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created successfully",
      data: result,
    });
  }
);

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await categoryService.getAllCategoryFromDb();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: " Categories retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
export const CategoryController = {
  createCategory,
  getAllCategory,
};
