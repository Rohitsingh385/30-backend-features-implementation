import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";
import { createPostSchema } from "./post.schema.js";
import { createPostController, getPostController } from "./post.controller.js";
const router = Router()

router.post("/", authMiddleware, validate(createPostSchema), createPostController)
router.get("/", getPostController)
export default router;