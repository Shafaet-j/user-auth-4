import httpStatus from "http-status";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import sendResponse from "../../utils/sendResponds";
import { AuthServices } from "./auth.service";
import { Request, Response } from "express";

const loginUser = CatchAsyncError(async (req, res) => {
  const result = await AuthServices.loginUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User is logged in succesfully!",
    data: result,
  });
});

const changePassword = CatchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthServices.changePasswordIntoDB(req.body, req.user);
  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: 400,
      message:
        "Password change failed. Ensure the new password is unique and not among the last two used",
      data: null,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
