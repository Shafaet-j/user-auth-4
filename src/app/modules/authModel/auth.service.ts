import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../userModel/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserService = async (payload: TLoginUser) => {
  console.log(payload);
  const isUserExist = await User.findOne({
    username: payload?.username,
  }).select("+password");
  console.log(isUserExist);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "this user not found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "password doesnot match");
  }

  //   create token and send to client
  const jwtPayload = {
    _id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: 60 * 60,
  });

  const result = {
    ...isUserExist.toObject(),
    password: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };

  return {
    user: result,
    token,
  };
};

export const AuthServices = {
  loginUserService,
};
