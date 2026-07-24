import { Router } from "express";
import { addCategoryController, updateCategoryController, getCategoryController } from "./category.controller";
import { validate } from "../../middleware/validate"
import { saveCategorySchema, updateCategorySchema } from "./category.valdiation"
const router = Router()

router.get("/", getCategoryController)
router.post("/", validate(saveCategorySchema), addCategoryController)
router.patch("/:id", validate(updateCategorySchema), updateCategoryController)

export default router