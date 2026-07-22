import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";
import { createPostSchema, DeletePostSchema, getPostsByTagsSchema, getPostsQuerySchema } from "./post.schema.js";
import { createPostController, deletePostController, getPostController, getPostsByTagController, getPostsByTagsController } from "./post.controller.js";
const router = Router()

router.post("/", authMiddleware, validate(createPostSchema), createPostController)
router.get("/", authMiddleware, validate(getPostsQuerySchema, "query") ,getPostController)
router.get("/tag/:tag", validate(getPostsByTagsSchema, "query") ,getPostsByTagController)
router.get("/tags",validate(getPostsByTagsSchema, "query"), getPostsByTagsController)

router.delete("/:id", authMiddleware, validate(DeletePostSchema, "params"), deletePostController)

export default router;
