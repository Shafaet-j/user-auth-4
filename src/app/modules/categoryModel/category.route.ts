import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/api/categories", CategoryController.createCategory);
router.get("/api/categories", CategoryController.getAllCategory);

export const CategoryRoutes = router;
