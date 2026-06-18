import Router from "express"
import {create , update, deletePost, posts} from "./post.controller.js"
import {Auth } from "../auth/auth.middleware.js"
const router = Router()

router.post('/post/create',Auth, create)
router.patch('/uddate',Auth, update)
router.delete('/delete', Auth, deletePost)
router.get('/posts',Auth, posts)

export default router