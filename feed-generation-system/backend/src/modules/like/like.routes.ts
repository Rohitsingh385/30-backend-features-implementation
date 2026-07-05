import { Router } from "express";
import { likePostController, unlikePostController } from "./like.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { likePostSchema } from "./like.schema.js";
import { validate } from "../../middleware/validate.js";
const router = Router()

router.post("/:id", authMiddleware, validate(likePostSchema, "params"), likePostController)
router.delete("/:id", authMiddleware, validate(likePostSchema, "params"), unlikePostController)

export default router;