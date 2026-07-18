import Router from "express"    
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { validate } from "../../middleware/validate.js"
import { bookmarkParseSchema } from "./bookmark.validation.js"
import { getBookmarkController, removeBookmarkController, saveBookmarkController } from "./bookmark.controller.js"

const router = Router()

router.post("/:postId", authMiddleware, validate(bookmarkParseSchema, "params"), saveBookmarkController)
router.delete("/:postId", authMiddleware, validate(bookmarkParseSchema, "params"), removeBookmarkController)
router.get("/", authMiddleware, getBookmarkController)
export default router