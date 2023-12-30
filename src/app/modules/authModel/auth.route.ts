import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../userModel/user.constant";

const router = express.Router();

router.post(
  "/api/auth/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/api/auth/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidation),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
