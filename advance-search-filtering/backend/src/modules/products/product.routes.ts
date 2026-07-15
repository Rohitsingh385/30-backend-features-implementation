import { Router } from "express";
import { addProductController, getProductController } from "./product.controller.js";
import { validate } from "../../middlewares/validate.js";
import { ProductValidateSchema } from "./product.validation.js";
const router = Router()


router.get("/product", getProductController)

router.post("/product", validate(ProductValidateSchema), addProductController)

export default router