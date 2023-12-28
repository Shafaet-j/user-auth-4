import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: "Username is requried" }),
    password: z.string({ required_error: "password is requried" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
