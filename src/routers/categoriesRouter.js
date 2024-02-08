import express from "express";
import {
  addCategoryController,
  CategoryWithAllController,
  deleteOneCategoryController,
  getOneCategoryController,
  updateOneCategoryController,
  activatecategory,
  diactivatecategory
} from "../controllers/categoriesController"; // Update the import for the CategoriesController
import { protect } from "../middlewares/protect";

const router = express.Router();

router.delete("/delete/:id",protect, deleteOneCategoryController);
router.post("/add/",protect, addCategoryController);
router.get("/", protect,CategoryWithAllController);
router.get("/all",protect,  CategoryWithAllController);
router.get("/one/:id",protect, getOneCategoryController);
router.put("/:id",protect, updateOneCategoryController);
router.put("/activate/:id",protect, activatecategory);
router.put("/diactivate/:id",protect, diactivatecategory);

export default router;
