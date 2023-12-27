import express from "express";

import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { reviewValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/api/reviews",
  validateRequest(reviewValidation.reviewValidationSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
