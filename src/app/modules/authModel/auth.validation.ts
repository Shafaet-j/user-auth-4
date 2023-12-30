import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is requried" }),
    password: z.string({ required_error: "password is requried" }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidation,
};
