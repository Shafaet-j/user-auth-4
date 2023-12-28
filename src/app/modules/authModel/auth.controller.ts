import httpStatus from "http-status";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import sendResponse from "../../utils/sendResponds";
import { AuthServices } from "./auth.service";

const loginUser = CatchAsyncError(async (req, res) => {
  const result = await AuthServices.loginUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};