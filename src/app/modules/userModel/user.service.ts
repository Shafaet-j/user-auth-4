import { TUser } from "./user.interface";
import { User } from "./user.model";

const creteUserService = async (userData: TUser) => {
  const result = await User.create(userData);
  const withOutPass = {
    ...result.toObject(),
    password: undefined,
    oldPassword: undefined,
    moreOldPassword: undefined,
  };
  return withOutPass;
};

export const userService = {
  creteUserService,
};
