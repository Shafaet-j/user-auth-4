import express from "express";

import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidation } from "./review.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../userModel/user.constant";

const router = express.Router();

router.post(
  "/api/reviews",
  auth(USER_ROLE.user),
  validateRequest(reviewValidation.reviewValidationSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
