import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";
import { followUserSchema } from "./follow.schema.js";
import { followUserController, unfollowUserController } from "./follow.controller.js";
const router = Router()



router.post("/:id", authMiddleware, validate(followUserSchema, "params"), followUserController )
router.delete("/:id", authMiddleware, validate(followUserSchema, "params"), unfollowUserController )

export default router