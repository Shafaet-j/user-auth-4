import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";

const router = express.Router();

router.post(
  "/api/course",
  validateRequest(courseValidation.createCourseValidationSchema),
  CourseController.createCourse
);
router.get("/api/courses/:courseId/reviews", CourseController.getSingleCourse);
router.put(
  "/api/courses/:courseId",
  validateRequest(courseValidation.updateCourseValidationSchema),
  CourseController.updatePartialCourse
);
router.get("/api/courses/:courseId", CourseController.getSingleCourse);
router.get("/api/courses", CourseController.getAllCourses);
router.get("/api/course/best", CourseController.getBestCourse);

export const CourseRoutes = router;
