import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../userModel/user.constant";

const router = express.Router();

router.post(
  "/api/categories",
  auth(USER_ROLE.admin),
  CategoryController.createCategory
);
router.get("/api/categories", CategoryController.getAllCategory);

export const CategoryRoutes = router;
