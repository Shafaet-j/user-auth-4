import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import { CatchAsyncError } from "../../utils/CatchAsyncError";

// const createReview = async (req: Request, res: Response) => {
//   try {
//     const review = req.body;

//     const result = await ReviewService.createReviewIntoDb(review);
//     res.status(200).json({
//       success: true,
//       message: "Review created successfully",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Review not found",
//       error: {
//         code: 404,
//         description: "Review not found!",
//       },
//     });
//   }
// };

const createReview = CatchAsyncError(async (req: Request, res: Response) => {
  const review = req.body;

  const result = await ReviewService.createReviewIntoDb(review);
  res.status(200).json({
    success: true,
    statusCode: 201,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
