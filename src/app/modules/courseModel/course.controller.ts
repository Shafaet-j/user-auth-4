import { NextFunction, Request, Response } from "express";
import { CourseService } from "./course.service";
import sendResponse from "../../utils/sendResponds";
import httpStatus from "http-status";
import { CatchAsyncError } from "../../utils/CatchAsyncError";
import { ReviewService } from "../reviewModel/review.service";

const createCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = req.body;

    const result = await CourseService.createCourseIntoDb(course);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Course created succesfully",
      data: result,
    });
  }
);
const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await CourseService.getAllCourseFromDb(query);
    console.log(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Courses retrieved successfully",
      data: result,
    });
  }
);
const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const course = await CourseService.getSingleCourseWithReviewFromDb(
      courseId
    );
    const reviews = await ReviewService.getReviewByCourseID(courseId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course and Reviews retrieved successfully",
      data: { course, reviews },
    });
  }
);

const getBestCourse = CatchAsyncError(async (req: Request, res: Response) => {
  const review = await ReviewService.highestReviews();
  const course = await CourseService.getSingleCourseWithReviewFromDb(
    review?._id
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Best course retrieved successfully",
    data: {
      course,
      averageRating: review?.averageRating,
      reviewCount: review?.reviewCount,
    },
  });
});

const updatePartialCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;

    const result = await CourseService.updateCourseFromDb(courseId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Course updated successfully",
      data: result,
    });
  }
);

export const CourseController = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updatePartialCourse,
  getBestCourse,
};
