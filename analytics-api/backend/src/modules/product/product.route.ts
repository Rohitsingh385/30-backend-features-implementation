import { Router } from "express"
import { getProductController, getProductByIdController, addProductController, updateProductController } from "./product.controller"
import { validate } from "../../middleware/validate"
import { addProductSchema, updateProductSchema, productIdSchema } from "./product.validation"
const router = Router()

router.get('/', getProductController)
router.get('/:id', validate(productIdSchema), getProductByIdController)
router.post('/', validate(addProductSchema), addProductController)
router.patch('/:id', validate(updateProductSchema), updateProductController)

export default router