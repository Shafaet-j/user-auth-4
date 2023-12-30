import { USER_ROLE } from "./user.constant";

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  oldPassword: string;
  moreOldPassword: string;
};

export type TuserRole = keyof typeof USER_ROLE;
