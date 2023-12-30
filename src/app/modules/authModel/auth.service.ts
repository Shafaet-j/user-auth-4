import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../userModel/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
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

const changePasswordIntoDB = async (
  payload: TChangePassword,
  userData: JwtPayload
) => {
  const user = await User.findById(userData?._id).select(
    "+password +oldPassword +moreOldPassword"
  );
  console.log({ user }, { userData }, { payload });
  if (!user) {
    throw new AppError(401, `Your provided Token is not valid user!`);
  }

  if (payload.currentPassword === payload.newPassword) {
    return null;
  }

  //checking if the current password is matched
  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    return null;
  }

  const isMatchWithOldPassword = await bcrypt.compare(
    payload.newPassword,
    user?.oldPassword
  );
  const isMatchWithMoreOldPassword = await bcrypt.compare(
    payload.newPassword,
    user?.moreOldPassword
  );

  if (isMatchWithOldPassword || isMatchWithMoreOldPassword) {
    return null;
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );

  return await User.findByIdAndUpdate(
    userData?._id,
    {
      password: hashPassword,
      oldPassword: user?.password,
      moreOldPassword: user?.oldPassword,
    },
    { new: true }
  );
};

export const AuthServices = {
  loginUserService,
  changePasswordIntoDB,
};
