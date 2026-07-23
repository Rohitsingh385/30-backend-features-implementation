import { Router } from "express";
import { createProductController, getProductByIdController, getProductsController, updateProductByIdController } from "./product.controller";
import { createProductSchema, updateProductSchema, getProductByIdSchema } from "./product.validation";
import { validate } from "../../middlewares/validate"
const router = Router()

router.post("/", validate(createProductSchema), createProductController)
router.get("/", getProductsController)
router.get("/:productId", validate(getProductByIdSchema), getProductByIdController)
router.post("/:productId", validate(updateProductSchema), updateProductByIdController)
export default router