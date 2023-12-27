import { Router } from "express";
import { CourseRoutes } from "../modules/courseModel/course.route";
import { CategoryRoutes } from "../modules/categoryModel/category.route";
import { ReviewRoutes } from "../modules/reviewModel/review.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: CourseRoutes,
  },
  {
    path: "/",
    route: CategoryRoutes,
  },
  {
    path: "/",
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
