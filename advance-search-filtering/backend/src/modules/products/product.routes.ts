import { Router } from "express";
import { addProductController, getProductController } from "./product.controller.js";
import { validate } from "../../middlewares/validate.js";
import { ProductCreateSchema, ProductQuerySchema } from "./product.validation.js";
const router = Router()


router.get("/products", validate(ProductQuerySchema), getProductController)

router.post("/products", validate(ProductCreateSchema), addProductController)

export default router