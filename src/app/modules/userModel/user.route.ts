import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema),
  userControllers.createUser
);

export const UserRoutes = router;
