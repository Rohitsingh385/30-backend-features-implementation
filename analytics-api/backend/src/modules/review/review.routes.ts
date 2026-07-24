import { Router } from "express"
import { addReviewController, updateReviewController, getReviewByIdController } from "./review.controller"
import { ReviewIdSchema, addReviewSchema, updateReviewSchema } from "./review.validation"
import { validate } from "../../middleware/validate"
const router = Router()

router.get('/:productId', validate(ReviewIdSchema), getReviewByIdController)
router.post('/:productId', validate(addReviewSchema), addReviewController)
router.patch('/:reviewId', validate(updateReviewSchema), updateReviewController)
export default router