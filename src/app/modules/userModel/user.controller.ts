import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponds";

const createUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const result = await userService.creteUserService(user);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  }
);

export const userControllers = {
  createUser,
};
