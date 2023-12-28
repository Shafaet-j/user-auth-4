import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../userModel/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserService = async (payload: TLoginUser) => {
  console.log(payload);
  const isUserExist = await User.findOne({ username: payload?.username });
  console.log(isUserExist);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "this user not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "password doesnot match");
  }

  //   create token and send to client
  const jwtPayload = {
    username: isUserExist.username,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: 60 * 60,
  });
  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserService,
};
