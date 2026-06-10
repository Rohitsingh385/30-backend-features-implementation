import Router from "express"
import {post, getPosts, getPost, updatePost, delPost} from "./post.controller.js"
import { authMiddleware } from "../Auth/user.middleware.js"
const Post = Router()

Post.post('/posts',authMiddleware, post)
Post.get('/posts', getPosts)
Post.get('/posts/:id', getPost)
Post.patch('/posts/:id', authMiddleware, updatePost)
Post.delete('/posts/:id', authMiddleware, delPost)

export default Post