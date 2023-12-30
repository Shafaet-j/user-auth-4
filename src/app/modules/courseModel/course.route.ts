import express from "express";
import { CourseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../userModel/user.constant";

const router = express.Router();

router.post(
  "/course",
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.createCourseValidationSchema),
  CourseController.createCourse
);
router.get("/courses/:courseId/reviews", CourseController.getSingleCourse);
router.put(
  "/courses/:courseId",
  auth(USER_ROLE.admin),
  validateRequest(courseValidation.updateCourseValidationSchema),
  CourseController.updatePartialCourse
);
router.get("/courses/:courseId", CourseController.getSingleCourse);
router.get("/courses", CourseController.getAllCourses);
router.get("/course/best", CourseController.getBestCourse);

export const CourseRoutes = router;
