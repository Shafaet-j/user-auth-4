import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDb = async (reviewData: TReview) => {
  return (await Review.create(reviewData)).populate({
    path: "createdBy",
    select: "_id email role username",
  });
};

const highestReviews = async () => {
  const reviews = await Review.aggregate([
    {
      $group: {
        _id: "$courseId",
        reviewCount: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
    { $sort: { averageRating: -1 } },
  ]);
  const highestAverageRating = reviews[0];
  return highestAverageRating;
};

const getReviewByCourseID = async (courseId: string) => {
  return await Review.find({ courseId }).populate({
    path: "createdBy",
    select: "_id email role username",
  });
};

export const ReviewService = {
  createReviewIntoDb,
  highestReviews,
  getReviewByCourseID,
};
