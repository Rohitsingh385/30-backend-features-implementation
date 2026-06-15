import Router from "express"
import { like, unlike } from "./likes.controller.js"
import { authMiddleware } from "../Auth/user.middleware.js"
const Like = Router()


Like.post('/posts/:postId/like', authMiddleware, like)
Like.delete('/posts/:postId/like', authMiddleware, unlike)

export default Like