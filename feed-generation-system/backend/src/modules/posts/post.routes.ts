import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";
import { createPostSchema, DeletePostSchema, getPostsQuerySchema } from "./post.schema.js";
import { createPostController, deletePostController, getPostController } from "./post.controller.js";
const router = Router()

router.post("/", authMiddleware, validate(createPostSchema), createPostController)
router.get("/", authMiddleware, validate(getPostsQuerySchema, "query") ,getPostController)
router.delete("/:id", authMiddleware, validate(DeletePostSchema, "params"), deletePostController)

export default router;
